import "./ForgotPassword.css"
import { Typography, Button } from "@mui/material"
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {useAlert} from "react-alert"
import { forgotPassword } from "../../Actions/Like"
import { ClearErrors, ClearMessage } from "../../Reducers/Like"

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const dispatch = useDispatch()
  const {error,message,loading} = useSelector(state=>state.like)
  const alert = useAlert()

  const submitHandler= async(e)=>{
    e.preventDefault();
    await dispatch(forgotPassword(email))
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
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant='h3' style={{padding:"2vmax"}} >Social Media App</Typography>

        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
       
       
        <Button disabled={loading} type="submit">Send Token</Button>
 
      </form>

    </div>
  )
}



export default ForgotPassword
