import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated :false,
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{  
        LoginRequest : (state)=> {
            state.loading = true;
        },
        LoginSuccess : (state,action)=> {
            state.loading=false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        LoginFailure : (state,action)=> {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        RegisterRequest : (state)=> {
            state.loading = true;
        },
        RegisterSuccess : (state,action)=> {
            state.loading=false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        RegisterFailure : (state,action)=> {
            state.loading=false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        UpdateUserRequest : (state)=> {
            state.loading = true;
        },
        UpdateUserSuccess : (state,action)=> {
            state.loading=false;
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.isAuthenticated = true;
        },
        UpdateUserFailure : (state,action)=> {
            state.loading=false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        LoadUserRequest : (state)=>{
            state.loading=true;
        },
        LoadUserSuccess : (state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        LoadUserFailure : (state,action)=>{
            state.loading=false;
            state.user = action.payload;
            state.isAuthenticated = false;
        },
        LogoutUserRequest : (state)=>{
            state.loading=true;
        },
        LogoutUserSuccess : (state)=>{
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },
        LogoutUserFailure : (state,action)=>{
            state.loading=false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        DeleteProfileRequest : (state)=>{
            state.loading=true;
        },
        DeleteProfileSuccess : (state,action)=>{
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.message = action.payload
        },
        DeleteProfileFailure : (state,action)=>{
            state.loading=false;
            state.error = action.payload;
        },
        UserClearErrors:(state)=>{
            state.error = null;
        },
        ClearMessages:(state)=>{
            state.message = null;
        },
    }
})

export const {
    LoginRequest,
    LoginSuccess,
    LoginFailure,
    RegisterRequest,
    RegisterSuccess,
    RegisterFailure,
    LoadUserRequest,
    LoadUserSuccess,
    LoadUserFailure,
    LogoutUserRequest,
    LogoutUserFailure,
    LogoutUserSuccess,
    UpdateUserRequest,
    UpdateUserSuccess,
    UpdateUserFailure,
    UserClearErrors,
    DeleteProfileRequest,
    DeleteProfileFailure,
    DeleteProfileSuccess,
    ClearMessages,
    ClearSuccess
} = userSlice.actions;
export default userSlice.reducer
