import "./NewPost.css";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import {useSelector,useDispatch} from "react-redux"
import { createNewPost } from "../../Actions/Like";
import { useAlert } from 'react-alert'
import { ClearErrors, ClearMessage } from "../../Reducers/Like";
import { loadUser } from "../../Actions/User";



const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const alert = useAlert()
  
  const {loading,error,message} = useSelector(state=>state.like)
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = ()=>{
      if(Reader.readyState===2){
        setImage(Reader.result);
      }
    }
  };


  const handleSubmit = async (e)=>{
    e.preventDefault();
    await dispatch(createNewPost(caption,image));
    dispatch(loadUser())
  }

  useEffect(() => {
    if(message){
      alert.success(message);
      dispatch(ClearMessage())
    }
    if(error){
      alert.error(error);
      dispatch(ClearErrors())
    }
  }, [error,message,alert,dispatch])
  

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={handleSubmit}>
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
        />
        <Button disabled={loading} type="submit">Post</Button>
      </form>
    </div>
  );
};

export default NewPost;
