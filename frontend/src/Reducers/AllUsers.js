import { createSlice } from "@reduxjs/toolkit";
const initialState = { }

const allUsersSlice = createSlice({
    name:"allUsers",
    initialState,
    reducers:
    {
        AllUsersRequest:(state)=>{
            state.loading  = true
        },
        AllUsersSuccess:(state,action)=>{
            state.loading  = false
            state.users = action.payload
        },
        AllUsersFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        ClearErrors:(state)=>{
            state.error = null
        },
    }
})

export default allUsersSlice.reducer

export const {
    AllUsersRequest,
    AllUsersSuccess,
    AllUsersFailure,
    ClearErrors
} = allUsersSlice.actions