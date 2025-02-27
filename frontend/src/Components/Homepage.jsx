import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";


function Homepage() {

  const [loggedUser, setLoggedUser] = useState('');
  const [products, setProducts] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedUser(localStorage.getItem('logged_In_User_Name'))
  },[]);

  const handleLogout = (e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('logged_In_User_Name');
    handleSuccess('User Logout Successfully');
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }

  // hoempage product api call
  const fetchProduct = async () =>{
    try{
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          'Authorization' : localStorage.getItem('token')
        }
    }
    const response = await fetch(url, headers);
    const result = await response.json();
    console.log(result);
    setProducts(result);
    }catch(err){
      handleError(err);
    }
  }

  useEffect(()=>{
    fetchProduct()
  },[])

  return (
    <div>
      <h1>Welcome {loggedUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products && products?.map((item, index)=>{
            <ul key={index}>
              <span>{item.name} : {item.price}</span>
            </ul>
          })
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Homepage