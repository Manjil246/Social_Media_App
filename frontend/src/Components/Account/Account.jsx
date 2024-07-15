import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../Actions/MyPosts";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import Post from "../Post/Post";
import { ClearErrors, ClearMessage } from "../../Reducers/Like";
import { MyPostsClearErrors } from "../../Reducers/MyPosts";
import { Link } from "react-router-dom";
import User from "../User/User";
import { deleteMyProfile, logoutUser } from "../../Actions/User";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [followersToggle, setFollowersToggle] = useState(false)
  const [followingToggle, setFollowingToggle] = useState(false)

  const {
    loading,
    error: myPostError,
    posts,
  } = useSelector((state) => state.myPosts);

  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);

  const { loading: userLoading, user} = useSelector((state) => state.user);

  const logoutHandler = async ()=>{
    dispatch(logoutUser())
    alert.success("Logout Successfully");
  }

  const deleteProfileHandler = ()=>{
    dispatch(deleteMyProfile());
  }

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch])
  

  useEffect(() => {
    if (likeError) {
      alert.error(likeError);
      dispatch(ClearErrors());
    }
    if (myPostError) {
      alert.error(myPostError);
      dispatch(MyPostsClearErrors());
    }
    if (message) {
      alert.success(message);
      dispatch(ClearMessage());
    }
  }, [dispatch, alert, message, likeError, myPostError]);

  return loading || userLoading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={user.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              user={user}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">
            You have not made any posts yet!!
          </Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <div>
          <button onClick={() => {setFollowersToggle(!followersToggle);}}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <button onClick={() => {setFollowingToggle(!followingToggle)}}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>

        <Button variant="contained" onClick={logoutHandler}>Logout</Button>
        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>
        <Button variant="text" style={{ color: "red", margin: "2vmax" }} onClick={deleteProfileHandler} disabled={deleteLoading}>
          Delete Profile
        </Button>




        <Dialog
          open={followersToggle}
          onClose={() => {
            setFollowersToggle(!followersToggle);
          }}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length>0?user.followers.map((follower) => {
              return (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              );
            }):<Typography style={{margin:"2vmax"}}>No Followers Yet</Typography>}
          </div>
        </Dialog>



        <Dialog
          open={followingToggle}
          onClose={() => {
            setFollowingToggle(!followingToggle);
          }}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>
            {user && user.following.length>0?user.following.map((follow) => {
              return (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              );
            }):<Typography style={{margin:"2vmax"}}>You haven't followed anyone yet.</Typography>}
          </div>
        </Dialog>




      </div>
    </div>
  );
};

export default Account;
