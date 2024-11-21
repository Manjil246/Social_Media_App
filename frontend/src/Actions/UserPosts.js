import axiosUser from "../auth/user";
import { 
    UserPostsRequest,
    UserPostsFailure,
    UserPostsSuccess
 } from "../Reducers/UserPosts" 
 import Cookies from "js-cookie";



export const getUserPosts = (id)=> async (dispatch)=>{
    try {

        dispatch(UserPostsRequest());

        const {data} = await axiosUser.get(`/post/userposts`);

        dispatch(UserPostsSuccess(data.posts))

 
        
    } catch (error) {
        dispatch(UserPostsFailure(error.response.data.message));
    }
}


