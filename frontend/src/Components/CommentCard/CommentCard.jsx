import { Typography, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./CommentCard.css";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/Like";
import { getFollowingPosts } from "../../Actions/PostsFollowing";
import { getMyPosts } from "../../Actions/MyPosts";
import { getUserPosts } from "../../Actions/UserPosts";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
  userProfile
}) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const deleteCommentHandler = async () => {
    await dispatch(deleteCommentOnPost(postId, commentId));
    if(userProfile===""){
      if(isAccount===false){
          dispatch(getFollowingPosts())
      }else{
          dispatch(getMyPosts())
      }
      }else{
        dispatch(getUserPosts(userProfile))
      }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
      {isAccount ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
