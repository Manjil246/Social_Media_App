import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers:{
        LikeRequest:(state)=>{
            state.loading  = true
        },
        LikeSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        LikeFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        AddCommentRequest:(state)=>{
            state.loading  = true
        },
        AddCommentSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        AddCommentFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        DeleteCommentRequest:(state)=>{
            state.loading  = true
        },
        DeleteCommentSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        DeleteCommentFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        UpdateCaptionRequest:(state)=>{
            state.loading  = true
        },
        UpdateCaptionSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        UpdateCaptionFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        NewPostRequest:(state)=>{
            state.loading  = true
        },
        NewPostSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        NewPostFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        DeletePostRequest:(state)=>{
            state.loading  = true
        },
        DeletePostSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        DeletePostFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        UpdatePasswordRequest:(state)=>{
            state.loading  = true
        },
        UpdatePasswordSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        UpdatePasswordFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        ForgotPasswordRequest:(state)=>{
            state.loading  = true
        },
        ForgotPasswordSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        ForgotPasswordFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        ResetPasswordRequest:(state)=>{
            state.loading  = true
        },
        ResetPasswordSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        ResetPasswordFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        FollowUserRequest:(state)=>{
            state.loading  = true
        },
        FollowUserSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        FollowUserFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        ClearErrors:(state)=>{
            state.error = null
        },
        ClearMessage:(state)=>{
            state.message = null
        }
    }
})

export default likeSlice.reducer;

export const {
    LikeRequest,
    LikeSuccess,
    LikeFailure,
    AddCommentRequest,
    AddCommentSuccess,
    AddCommentFailure,
    ClearErrors,
    ClearMessage,
    DeleteCommentRequest,
    DeleteCommentSuccess,
    DeleteCommentFailure,
    NewPostFailure,
    NewPostSuccess,
    NewPostRequest,
    UpdateCaptionRequest,
    UpdateCaptionSuccess,
    UpdateCaptionFailure,
    DeletePostRequest,
    DeletePostSuccess,
    DeletePostFailure,
    UpdatePasswordFailure,
    UpdatePasswordSuccess,
    UpdatePasswordRequest,
    ForgotPasswordRequest,
    ForgotPasswordSuccess,
    ForgotPasswordFailure,
    ResetPasswordRequest,
    ResetPasswordSuccess,
    ResetPasswordFailure,
    FollowUserFailure,
    FollowUserRequest,
    FollowUserSuccess
} = likeSlice.actions;