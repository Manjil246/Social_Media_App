import { Avatar, Button, Typography } from "@mui/material"
import "./Register.css"
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../Actions/User";
import {useAlert} from "react-alert"
import { UserClearErrors} from "../../Reducers/User";

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState(null)
    const dispatch = useDispatch()
    const {loading,error} = useSelector(state=>state.user)
    const alert = useAlert()

    const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);

      Reader.onload = ()=>{
        if(Reader.readyState === 2){
          setAvatar(Reader.result)
        }
      }
    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      dispatch(registerUser(name,email,password,avatar))
    }

    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(UserClearErrors())
      }
      
    }, [alert,error,dispatch])
    


  return (
    <div className="register">
      <form  className="registerForm" onSubmit={handleSubmit}>

      <Typography variant='h3' style={{padding:"2vmax"}} >Social Media App</Typography>

      <Avatar src={avatar} alt="User" sx={{height:"10vmax",width:"10vmax"}} />

      <input type="file" accept="image/*" onChange={handleAvatarChange} required/>

        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required className="registerInputs"/>

        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="registerInputs"/>

        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="registerInputs"/>

        <Link to="/"> <Typography>Already Signed Up? Login Now</Typography>  </Link>

        
        <Button disabled = {loading} type="submit">Sign Up</Button>
        
      </form>
    </div>
  )
}

export default Register
