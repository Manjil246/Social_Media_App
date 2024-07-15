import React, {useEffect, useState} from 'react'
import "./Post.css"
import { Avatar, Typography,Button, Dialog } from '@mui/material'
import { Link } from 'react-router-dom'
import {addCommentOnPost, deletePost, likePost, updateCaptionOnPost} from "../../Actions/Like"
import User from '../User/User'
import CommentCard from '../CommentCard/CommentCard.jsx'


import{
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline ,
} from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import { getFollowingPosts } from '../../Actions/PostsFollowing'
import { getMyPosts } from '../../Actions/MyPosts.js'
import { getUserPosts } from '../../Actions/UserPosts.js'

const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete= false,
    isAccount = false,
    user,
    userProfile  = ""
} ) => {

    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const [commentToogle, setCommentToogle] = useState(false)
    const [captionValue, setCaptionValue] = useState(caption)
    const [captionToogle, setCaptionToogle] = useState(false)


    const dispatch = useDispatch();
    const handleLike = async ()=>{
        setLiked(!liked);
        await dispatch(likePost(postId))
        if(userProfile===""){
            if(isAccount===false){
                dispatch(getFollowingPosts())
            }else{
                dispatch(getMyPosts())
            }
        }else{
            dispatch(getUserPosts(userProfile))
        }
    }

    const addCommentHandler = async (e)=>{
        e.preventDefault();
        await dispatch(addCommentOnPost(postId,commentValue))
        if(userProfile===""){
            if(isAccount===false){
                dispatch(getFollowingPosts())
            }else{
                dispatch(getMyPosts())
            }
        }else{
            dispatch(getUserPosts(userProfile))
        }
    }

    const updateCaptionHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateCaptionOnPost(captionValue,postId));
        dispatch(getMyPosts())
    }

    const deletePostHandler = async ()=>{
        await dispatch(deletePost(postId));
        if(userProfile===""){
            if(isAccount===false){
                dispatch(getFollowingPosts())
            }else{
                dispatch(getMyPosts())
            }
        }else{
            dispatch(getUserPosts(userProfile))
        }
    }

    
    useEffect(() => {
        likes.forEach((like)=>{
            if(like._id === user._id){
                setLiked(true);
            }
        })
    }, [likes,user._id])
    
    
  return (
    <div className='post'>
        <div className="postHeader">
            {isAccount && 
            <Button onClick={()=>{setCaptionToogle(!captionToogle)}}>
                <MoreVert/>    
            </Button>}
        </div>
        <img src={postImage} alt="post"/>
        <div className="postDetails">
            <Avatar src={ownerImage} alt='User' sx={{height:"3vmax",width:"3vmax"}}/>
            <Link to={`/user/${ownerId}`}>
                <Typography fontWeight={700}>{ownerName}</Typography>
            </Link>
            <Typography fontWeight={100} color={"rbga(0,0,0,0.528)"} style={{alignSelf:"center"}}>
                {caption}
            </Typography>
        </div>
        <button 
            style={{border:"none",backgroundColor:"white",cursor:"pointer",margin:"1vmax 2vmax"}} 
            onClick={()=>setLikesUser(!likesUser)}
            disabled = {likes.length>0?false:true}
            >
            <Typography >{likes.length} Likes</Typography>
        </button>
        <div className="postFooter">
            <Button onClick={handleLike}> {liked?<Favorite style={{color:"red"}}/>:<FavoriteBorder/>}</Button>
            <Button onClick={()=>setCommentToogle(!commentToogle)}> <ChatBubbleOutline/></Button>
            {isDelete && <Button onClick={deletePostHandler}> <DeleteOutline/></Button>}
        </div>









        <Dialog open={likesUser} onClose={()=>{setLikesUser(!likesUser)}} >
            <div className="DialogBox">
            <Typography variant='h4'>Liked By</Typography>
            {likes.map((like)=>{
                return <User 
                    key={like._id}
                    userId = {like._id}
                    name = {like.name}
                    avatar = {like.avatar.url}
                />
            })}
            </div>
        </Dialog>









        <Dialog open={commentToogle} onClose={()=>{setCommentToogle(!commentToogle)}} >
            <div className="DialogBox">
            <Typography variant='h4'>Comments</Typography>

            <form className="commentForm" onSubmit={addCommentHandler}>
                <input 
                    type="text" 
                    value={commentValue} 
                    onChange={(e)=>{setCommentValue(e.target.value)}} 
                    placeholder='Enter Comment'
                    required
                />
                <Button type='submit' variant='contained'>Add</Button>
            </form>

            {comments.length>0?comments.map((comment)=>{
                return (
                    <CommentCard
                    key={comment._id}
                    userId={comment.user._id}
                    name={comment.user.name}
                    avatar={comment.user.avatar.url}
                    comment={comment.comment}
                    commentId={comment._id}
                    postId={postId}
                    userProfile={userProfile}
                    isAccount={isAccount}
                    />
                )
            }):
            <Typography>No Comments Yet</Typography>}

            </div>
        </Dialog>




        
        <Dialog open={captionToogle} onClose={()=>{setCaptionToogle(!captionToogle)}} >
            <div className="DialogBox">
            <Typography variant='h4'>Caption</Typography>

            <form className="commentForm" onSubmit={updateCaptionHandler}>
                <input 
                    type="text" 
                    value={captionValue} 
                    onChange={(e)=>{setCaptionValue(e.target.value)}} 
                    placeholder='Enter Caption'
                    required
                />
                <Button type='submit' variant='contained'>Update</Button>
            </form>
            </div>
        </Dialog>






    </div>
  )
}

export default Post