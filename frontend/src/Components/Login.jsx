import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import {handleError, handleSuccess} from '../utils'
import { useState } from "react";

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const{name, value} = e.target;
        // console.log(name, value);
        const copyloginInfo = {...loginInfo};
        copyloginInfo[name] = value;
        setLoginInfo(copyloginInfo);
    }

    const handleLogin = async (e) =>{
        e.preventDefault();
        const {email, password} = loginInfo;
        if(!email || !password){
            return handleError('Email & Password must be Required!')
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Use normalizedEmail in your logic
        console.log('Normalized Email:', normalizedEmail);

        // here we call the backend api
        try{
            const url = "http://localhost:8080/auth/login"
            const response = await fetch(url, {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: normalizedEmail, password}) 
            });


            const result = await response.json();
            const{success, message, error, jwtToken, name} = result;
            if(success){
                handleSuccess(message);
                // here we store jwt token and username in local storage in browser
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('logged_In_User_Name', name);
                setTimeout(()=>{
                    navigate('/home')
                },1000)
            }else if(error){
                const details = error.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        }catch(err){
            handleError(err);
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} type="email" name='email'  placeholder="Enter your email...." value={loginInfo.email} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type="password" name='password'  placeholder="Enter your password...." value={loginInfo.password}/>
                </div>
                <button type="submit">Login</button>
                <span>Create an account ? 
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
      )
}

export default Login