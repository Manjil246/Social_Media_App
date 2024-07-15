import "./Login.css"
import { Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {loginUser} from "../../Actions/User"
import {useAlert} from "react-alert"
import {ClearMessages, UserClearErrors } from "../../Reducers/User"

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const {error,message} = useSelector(state=>state.user)
  const alert = useAlert()

  const loginHandler= async(e)=>{
    e.preventDefault();
    await dispatch(loginUser(email,password))
  }

  useEffect(() => {
    if(error){
        alert.error(error);
        dispatch(UserClearErrors())
    }
    if(message){
      alert.success(message);
      dispatch(ClearMessages())
    }
  }, [error,alert,dispatch,message])
  

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant='h3' style={{padding:"2vmax"}} >Social Media App</Typography>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <Link to="/forgot/password" >
          <Typography>Forgot Password?</Typography>
        </Link>
        <Button type="submit">Login</Button>
        <Link to="/register">
          <Typography>New User? Register</Typography>
        </Link>
      </form>

    </div>
  )
}

export default Login