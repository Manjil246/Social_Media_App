import { createSlice } from "@reduxjs/toolkit";
const initialState = {

}

const userPostsSlice = createSlice({
    name : "userPosts",
    initialState,
    reducers:{
        UserPostsRequest:(state)=>{
            state.loading  = true
        },
        UserPostsSuccess:(state,action)=>{
            state.loading = false;
            state.posts = action.payload
        },
        UserPostsFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        UserPostsClearErrors:(state)=>{
            state.error = null;
        }
    }
})

export default userPostsSlice.reducer

export const {
    UserPostsRequest,
    UserPostsFailure,
    UserPostsSuccess,
    UserPostsClearErrors,
} = userPostsSlice.actions


