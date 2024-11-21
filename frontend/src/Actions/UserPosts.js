import axios from "axios";
import { 
    UserPostsRequest,
    UserPostsFailure,
    UserPostsSuccess
 } from "../Reducers/UserPosts" 
 import Cookies from "js-cookie";



export const getUserPosts = (id)=> async (dispatch)=>{
    try {

        dispatch(UserPostsRequest());

        const {data} = await axios.get(`https://social-media-app-backend-three.vercel.app/post/userposts/${id}?token=${Cookies.get("token")}`);

        dispatch(UserPostsSuccess(data.posts))

 
        
    } catch (error) {
        dispatch(UserPostsFailure(error.response.data.message));
    }
}


