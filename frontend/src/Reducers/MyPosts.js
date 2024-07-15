import { createSlice } from "@reduxjs/toolkit";
const initialState = {

}

const MyPostsSlice = createSlice({
    name : "myPosts",
    initialState,
    reducers:{
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
        MyPostsClearErrors:(state)=>{
            state.error = null;
        }
    }
})

export default MyPostsSlice.reducer

export const {
    MyPostsRequest,
    MyPostsFailure,
    MyPostsSuccess,
    MyPostsClearErrors,
} = MyPostsSlice.actions


