import React, {useEffect} from 'react'
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux'
import User from '../User/User'
import Post from '../Post/Post'
import {getFollowingPosts} from "../../Actions/PostsFollowing"
import {getAllUsers} from "../../Actions/AllUsers"
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'
import { useAlert } from 'react-alert'
import { ClearMessage,ClearErrors } from '../../Reducers/Like'
import { PostClearErrors} from '../../Reducers/PostsFollowing'
import { loadUser } from '../../Actions/User'
import { UserClearErrors } from '../../Reducers/User'



const Home = () => {

    const alert = useAlert()

    const {error:likeError, message} = useSelector(state=>state.like);
    const {users,loading:usersLoading,error:userError} = useSelector(state=>state.allUsers)

    const {user} = useSelector(state=>state.user)



    const dispatch = useDispatch()
    const {loading, posts, error:postError} = useSelector(state=>state.postsOfFollowing)

    useEffect(() => {
      dispatch(loadUser())
      //eslint-disable-next-line
    },[])
    

    useEffect(() => {
        dispatch(getFollowingPosts())
        dispatch(getAllUsers())
        if(likeError){
            alert.error(likeError);
            dispatch(ClearErrors());
        }
        if(postError){
            alert.error(postError);
            dispatch(PostClearErrors());
        }
        if(message){
            alert.success(message);
            dispatch(ClearMessage());
        }
        if(userError){
            alert.error(userError);
            dispatch(UserClearErrors());
        }
    }, [dispatch,alert,message,likeError,postError,userError])

    
    

  return (
    loading===true || usersLoading===true?<Loader/>:
    (<div className="home">
        <div className="homeleft">
            {posts && posts.length>0?posts.map((post)=>(
                <Post 
                    key={post._id}
                    postId = {post._id}
                    caption = {post.caption}
                    postImage = {post.image.url}
                    likes = {post.likes}
                    comments = {post.comments}
                    ownerImage = {post.owner.avatar.url}
                    ownerName = {post.owner.name}
                    ownerId = {post.owner._id}
                    user= {user}
                />
            )
            ):<Typography variant='h6'>No posts yet!!</Typography>
            }
            
        </div>
        <div className="homeright">
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
    </div>)

  )
}

export default Home