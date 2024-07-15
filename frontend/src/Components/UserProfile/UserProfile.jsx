import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../Actions/UserPosts";
import { getUserProfile } from "../../Actions/UserProfile";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import Post from "../Post/Post";
import { ClearErrors, ClearMessage } from "../../Reducers/Like";
import { MyPostsClearErrors } from "../../Reducers/MyPosts";
import { useParams } from "react-router-dom";
import User from "../User/User";
import { followUnfollowUser } from "../../Actions/Like";
import { UserProfileClearError } from "../../Reducers/UserProfile";

const UserProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);

  const { user: loginUser } = useSelector((state) => state.user);

  const {
    loading: userLoading,
    user,
    error: userError,
  } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (loginUser._id === params.id) {
      setMyProfile(true);
    }
    for (let i = 0; i < loginUser.following.length; i++) {
      if (loginUser.following[i]._id === params.id) {
        setFollowing(true);
        break;
      }
    }
  }, [loginUser.following, params.id, loginUser._id]);

  const {
    error: myPostError,
    posts,
  } = useSelector((state) => state.userPosts);

  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followUnfollowUser(params.id));
    await dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    if (followError) {
      toast.error(followError);
      dispatch(ClearErrors());
    }
    if (userError) {
      toast.error(userError);
      dispatch(UserProfileClearError());
    }
    if (myPostError) {
      toast.error(myPostError);
      dispatch(MyPostsClearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(ClearMessage());
    }
  }, [dispatch,message, followError, userError, myPostError]);

  return (
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
              user={loginUser}
              isAccount={myProfile}
              isDelete={myProfile}
              userProfile={params.id}
            />
          ))
        ) : (
          <Typography variant="h6">
            User has not made any posts yet!!
          </Typography>
        )}
      </div>

      {userLoading ? (
        <Loader />
      ) : (
        <div className="accountright">
          {user && (
            <>
              <Avatar
                src={user.avatar.url}
                sx={{ height: "8vmax", width: "8vmax" }}
              />
              <Typography variant="h5">{user.name}</Typography>
              <div>
                <button
                  onClick={() => {
                    setFollowersToggle(!followersToggle);
                  }}
                >
                  <Typography>Followers</Typography>
                </button>
                <Typography>{user.followers.length}</Typography>
              </div>
              <div>
                <button
                  onClick={() => {
                    setFollowingToggle(!followingToggle);
                  }}
                >
                  <Typography>Following</Typography>
                </button>
                <Typography>{user.following.length}</Typography>
              </div>
              <div>
                <Typography>Posts</Typography>
                <Typography>{user.posts.length}</Typography>
              </div>
            </>
          )}

          {!myProfile && (
            <Button
              variant="contained"
              onClick={followHandler}
              style={{ backgroundColor: following ? "red" : "blue" }}
              disabled={followLoading}
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      )}
      <div>
        <Dialog
          open={followersToggle}
          onClose={() => {
            setFollowersToggle(!followersToggle);
          }}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => {
                return (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower.avatar.url}
                  />
                );
              })
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                No Followers Yet
              </Typography>
            )}
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
            {user && user.following.length > 0 ? (
              user.following.map((follow) => {
                return (
                  <User
                    key={follow._id}
                    userId={follow._id}
                    name={follow.name}
                    avatar={follow.avatar.url}
                  />
                );
              })
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                Not following anyone yet.
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
