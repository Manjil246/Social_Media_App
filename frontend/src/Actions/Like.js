import axios from "axios";

import {
    LikeRequest,
    LikeSuccess,
    LikeFailure,
    AddCommentRequest,
    AddCommentSuccess,
    AddCommentFailure,
    DeleteCommentRequest,
    DeleteCommentSuccess,
    DeleteCommentFailure,
    NewPostFailure,
    NewPostSuccess,
    NewPostRequest,
    UpdateCaptionRequest,
    UpdateCaptionSuccess,
    UpdateCaptionFailure,
    DeletePostFailure,
    DeletePostRequest,
    DeletePostSuccess,
    UpdatePasswordFailure,
    UpdatePasswordSuccess,
    UpdatePasswordRequest,
    ForgotPasswordRequest,
    ForgotPasswordSuccess,
    ForgotPasswordFailure,
    FollowUserFailure,
    FollowUserRequest,
    FollowUserSuccess
} from "../Reducers/Like"

export const likePost = (postId)=>async (dispatch)=>{
    try {
        dispatch(LikeRequest())

        const {data} = await axios.get(`/post/likeandunlike/${postId}`);

        dispatch(LikeSuccess(data.message))
    } catch (error) {
        dispatch(LikeFailure(error.response.data.message))
    }
}

export const addCommentOnPost = (postId, comment)=>async (dispatch)=>{
    try {
        dispatch(AddCommentRequest());

        const {data} = await axios.put(`/post/addupdatecomment/${postId}`,
            {comment},
            {
                headers:{
                    "Content-Type":"application/json",
                }
            }
        ); 
        
        dispatch(AddCommentSuccess(data.message))  
        
    }
   catch (error) {
        dispatch(AddCommentFailure(error.response.data.message));
    }
}


export const deleteCommentOnPost = (postId, commentId)=>async (dispatch)=>{
    try {
        dispatch(DeleteCommentRequest());

        const {data} = await axios.delete(`/post/deletecomment/${postId}`,
            {
                data:{commentId}
            }
        ); 
        
        dispatch(DeleteCommentSuccess(data.message))  
        
    }
   catch (error) {
        dispatch(DeleteCommentFailure(error.response.data.message));
    }
}


export const createNewPost = (caption, image)=>async (dispatch)=>{
    try {
        dispatch(NewPostRequest());

        const {data} = await axios.post(`/post/createpost`,
            {caption,image},
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        ); 
        
        dispatch(NewPostSuccess(data.message))  
        
    }
   catch (error) {
        dispatch(NewPostFailure(error.response.data.message));
    }
}




export const updateCaptionOnPost = (caption, postId)=>async (dispatch)=>{
    try {
        dispatch(UpdateCaptionRequest());

        const {data} = await axios.put(`/post/updatecaption/${postId}`,
            {caption},
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        ); 
        
        dispatch(UpdateCaptionSuccess(data.message))  
        
    }
   catch (error) {
        dispatch(UpdateCaptionFailure(error.response.data.message));
    }
}



export const deletePost = (postId)=>async (dispatch)=>{
    try {
        dispatch(DeletePostRequest());

        const {data} = await axios.delete(`/post/deletepost/${postId}`); 
        
        dispatch(DeletePostSuccess(data.message))  
        
    }
   catch (error) {
        dispatch(DeletePostFailure(error.response.data.message));
    }
}

export const updatePasswordUser = (oldPassword, newPassword)=>async (dispatch)=>{
    try {
        dispatch(UpdatePasswordRequest());

        const {data} = await axios.put(`/user/updatepassword`,
            {oldPassword,newPassword},
            {
                headers:{
                    "Content-Type":"application/json",
                }
            }
        ); 
        
        dispatch(UpdatePasswordSuccess(data.message))  
        
    }
   catch (error) {
        dispatch(UpdatePasswordFailure(error.response.data.message));
    }
}

export const forgotPassword = (email)=>async (dispatch)=>{
    try {
        dispatch(ForgotPasswordRequest());

        const {data} = await axios.post(`/user/forgotpassword`,
            {email},
            {
                headers:{
                    "Content-Type":"application/json",
                }
            }
        ); 
        
        dispatch(ForgotPasswordSuccess(data.message))  
        
    }
   catch (error) {
        dispatch(ForgotPasswordFailure(error.response.data.message));
    }
}


export const resetPassword = (password,token)=>async (dispatch)=>{
    try {
        dispatch(ForgotPasswordRequest());

        const {data} = await axios.put(`/user/forgotpassword/reset/${token}`,
            {password},
            {
                headers:{
                    "Content-Type":"application/json",
                }
            }
        ); 
        
        dispatch(ForgotPasswordSuccess(data.message))  
        
    }
   catch (error) {
        dispatch(ForgotPasswordFailure(error.response.data.message));
    }
}


export const followUnfollowUser = (id)=>async (dispatch)=>{
    try {
        dispatch(FollowUserRequest());

        const {data} = await axios.get(`/user/followuser/${id}`); 
        
        dispatch(FollowUserSuccess(data.message))  
        
    }
   catch (error) {
        dispatch(FollowUserFailure(error.response.data.message));
    }
}

