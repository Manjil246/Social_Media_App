import "./ResetPassword.css"
import { Typography, Button } from "@mui/material"
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {useAlert} from "react-alert"
import {ClearMessage, ClearErrors } from "../../Reducers/Like"
import { resetPassword } from "../../Actions/Like"
import { Link, useParams } from "react-router-dom"

const ResetPassword = () => {

  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const {error,message,loading} = useSelector(state=>state.like)
  const alert = useAlert()
  const params = useParams()

  const resetPasswordHandler= async(e)=>{
    e.preventDefault();
    await dispatch(resetPassword(password,params.token));
  }

  useEffect(() => {
    if(error){
        alert.error(error);
        dispatch(ClearErrors())
    }
    if(message){
      alert.success(message);
      dispatch(ClearMessage())
    }
  }, [error,alert,dispatch,message])
  

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={resetPasswordHandler}>
        <Typography variant='h3' style={{padding:"2vmax"}} >Social Media App</Typography>
       
        <input type="password" placeholder="Enter New Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>

        <Link to="/">
            <Typography>Login</Typography>
        </Link>

 
        <Button disabled={loading} type="submit">Reset</Button>

        <Link to="/forgot/password">
            <Typography>Send Token Again</Typography>
        </Link>

      </form>

    </div>
  )
}


export default ResetPassword
