import { createSlice } from "@reduxjs/toolkit";
const initialState = {

}

const userProfileSlice = createSlice({
    name : "userProfile",
    initialState,
    reducers:{
        UserProfileRequest:(state)=>{
            state.loading  = true
        },
        UserProfileSuccess:(state,action)=>{
            state.loading = false;
            state.user = action.payload
        },
        UserProfileFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        UserProfileClearError:(state)=>{
            state.error = null;
        },
        UserProfileClearMessage:(state)=>{
            state.message = null;
        }
    }
})

export default userProfileSlice.reducer

export const {
    UserProfileRequest,
    UserProfileFailure,
    UserProfileSuccess,
    UserProfileClearError,
    UserProfileClearMessage
} = userProfileSlice.actions


