import axios from "axios";
import { 
    UserPostsRequest,
    UserPostsFailure,
    UserPostsSuccess
 } from "../Reducers/UserPosts" 



export const getUserPosts = (id)=> async (dispatch)=>{
    try {

        dispatch(UserPostsRequest());

        const {data} = await axios.get(`https://social-media-app-backend-three.vercel.app/post/userposts/${id}`);

        dispatch(UserPostsSuccess(data.posts))

 
        
    } catch (error) {
        dispatch(UserPostsFailure(error.response.data.message));
    }
}


