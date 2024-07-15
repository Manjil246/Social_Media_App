import "./ForgotPassword.css"
import { Typography, Button } from "@mui/material"
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from "../../Actions/Like"
import { ClearErrors, ClearMessage } from "../../Reducers/Like"
import { ToastContainer, toast } from 'react-toastify'

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const dispatch = useDispatch()
  const {error,message,loading} = useSelector(state=>state.like)

  const submitHandler= async(e)=>{
    e.preventDefault();
    await dispatch(forgotPassword(email))
  }

  useEffect(() => {
    if(error){
        toast.error(error);
        dispatch(ClearErrors())
    }
    if(message){
      toast(message);
      dispatch(ClearMessage())
    }
  }, [error,toast,dispatch,message])
  

  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant='h3' style={{padding:"2vmax"}} >Social Media App</Typography>

        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
       
       
        <Button disabled={loading} type="submit">Send Token</Button>
 
      </form>
      <ToastContainer/>

    </div>
  )
}



export default ForgotPassword
