import { createSlice } from "@reduxjs/toolkit";
const initialState = {

}

const PostsOfFollowingSlice = createSlice({
    name : "postsOfFollowing",
    initialState,
    reducers:{
        PostOfFollowingRequest:(state)=>{
            state.loading  = true
        },
        PostOfFollowingSuccess:(state,action)=>{
            state.loading = false;
            state.posts = action.payload
        },
        PostOfFollowingFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        MyPostsRequest:(state)=>{
            state.loading  = true
        },
        MyPostsSuccess:(state,action)=>{
            state.loading = false;
            state.posts = action.payload
        },
        MyPostsFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        PostClearErrors:(state)=>{
            state.error = null;
        }
    }
})

export default PostsOfFollowingSlice.reducer

export const {
    PostOfFollowingRequest,
    PostOfFollowingSuccess,
    PostOfFollowingFailure,
    PostClearErrors,
} = PostsOfFollowingSlice.actions


