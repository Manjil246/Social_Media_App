import "./UpdatePassword.css"
import { Typography, Button } from "@mui/material"
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {updatePasswordUser} from "../../Actions/Like"
import { ToastContainer, toast } from 'react-toastify'
import { ClearMessage, ClearErrors } from "../../Reducers/Like"
import Loader from "../Loader/Loader"

const UpdatePassword = () => {


  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const dispatch = useDispatch()
  const {loading:userLoading} = useSelector(state=>state.user)
  const {message,error,loading:likeLoading} = useSelector(state=>state.like)

  const updatePasswordHandler= async (e) => {
    e.preventDefault();
    await dispatch(updatePasswordUser(oldPassword,newPassword))
  }

  useEffect(() => {
    if(error){
        toast.error(error);
        dispatch(ClearErrors())
    }
    if(message){
        toast(message)
        dispatch(ClearMessage())
    }
  }, [error,message,toast,dispatch])
  

  return (
    userLoading?<Loader/>:
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={updatePasswordHandler}>
        <Typography variant='h3' style={{padding:"2vmax"}} >Social Media App</Typography>
        
        <input type="password" placeholder="Password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} required/>

        <input type="password" placeholder="Confirm Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required/>
        
        <Button disabled={likeLoading} type="submit">Update Password</Button>
        
      </form>
      <ToastContainer/>

    </div>
  )
}


export default UpdatePassword
