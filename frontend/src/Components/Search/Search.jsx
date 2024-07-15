import React, { useEffect } from 'react'
import "./Search.css"
import { useState } from 'react'
import {Button, Typography} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {getAllUsers} from "../../Actions/AllUsers"
import User from '../User/User'
import Loader from '../Loader/Loader'

const Search = () => {

  const [name, setName] = useState("")
  const dispatch = useDispatch();
  const {users,loading} = useSelector(state=>state.allUsers)
  const {loading:userLoading} = useSelector(state=>state.user)

  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(getAllUsers(name))
  }

  useEffect(() => {
    dispatch(getAllUsers(name))
    //eslint-disable-next-line
  }, [dispatch])
  

  return (userLoading?<Loader/>:
    <div className="search">
      <form  className="searchForm" onSubmit={submitHandler}>

      <Typography variant='h3' style={{padding:"2vmax"}} >Social Media App</Typography>

      <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />

      <Button type="submit" disabled={loading}>Search</Button>
        
      

      <div className="searchResults">
            {users && users.length>0?users.map((user)=>(
                <User 
                key={user._id}
                userId = {user._id}
                name = {user.name}
                avatar = {user.avatar.url}
            >
            </User>
            )):<Typography variant='h6'>No Users Yet</Typography>}
        </div> 

        </form> 
    </div>
  )
}

export default Search
