import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/User";
import  postsOfFollowingReducer  from "./Reducers/PostsFollowing";
import  allUsersReducer  from "./Reducers/AllUsers";
import  likeReducer  from "./Reducers/Like";
import myPostsReducer from "./Reducers/MyPosts";
import userPostsReducer from "./Reducers/UserPosts";
import userProfileReducer from "./Reducers/UserProfile";

const store = configureStore({
    reducer:{
        "user":userReducer,
        "postsOfFollowing":postsOfFollowingReducer,
        "allUsers":allUsersReducer,
        "like":likeReducer,
        "myPosts":myPostsReducer,
        "userPosts":userPostsReducer,
        "userProfile":userProfileReducer
    },
})

export default store