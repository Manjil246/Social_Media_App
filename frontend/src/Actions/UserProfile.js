import axios from "axios";
import { 
    UserProfileRequest,
    UserProfileFailure,
    UserProfileSuccess
 } from "../Reducers/UserProfile" 




export const getUserProfile = (id)=> async (dispatch)=>{
    try {
        dispatch(UserProfileRequest());

        const {data} = await axios.get(`/user/getuserprofile/${id}`);

        dispatch(UserProfileSuccess(data.user))

    } catch (error) {
        dispatch(UserProfileFailure(error.response.data.message));
    }
}