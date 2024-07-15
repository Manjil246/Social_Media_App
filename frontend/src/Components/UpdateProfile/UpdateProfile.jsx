import { Avatar, Button, Typography } from "@mui/material"
import "./UpdateProfile.css"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserClearErrors, ClearMessages } from "../../Reducers/User";
import { ToastContainer, toast } from 'react-toastify'
import { updateUser } from "../../Actions/User";

const UpdateProfile = () => {

    
    const {loading,error,user,message} = useSelector(state=>state.user)

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email);
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url)
    const [avatar, setAvatar] = useState(null);


    const dispatch = useDispatch()

    const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);

      Reader.onload = ()=>{
        if(Reader.readyState === 2){
          setAvatarPrev(Reader.result)
          setAvatar(Reader.result)
        }
      }
    }

    const handleSubmit =  (e)=>{
      e.preventDefault();
      dispatch(updateUser(name,email,avatar))
    }

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch(UserClearErrors())
      }
      if(message){
        toast(message)
        dispatch(ClearMessages())
      }
    }, [error,dispatch,message])
    


  return (
    <div className="updateProfile">
      <form  className="updateProfileForm" onSubmit={handleSubmit}>

      <Typography variant='h3' style={{padding:"2vmax"}} >Social Media App</Typography>

      <Avatar src={avatarPrev} alt="User" sx={{height:"10vmax",width:"10vmax"}} />

      <input type="file" accept="image/*" onChange={handleAvatarChange} />

        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required className="updateProfileInputs"/>

        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="updateProfileInputs"/>

        <Button disabled = {loading} type="submit">Update</Button>
        
      </form>
      <ToastContainer/>
    </div>
  )
}

export default UpdateProfile
