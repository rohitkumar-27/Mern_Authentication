import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Homepage from "./Components/Homepage"



function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to ='/login'/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Homepage/>}/>
    </Routes>
    </>
  )
}


export default App
