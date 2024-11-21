import axios from "axios"

import { 
    PostOfFollowingRequest,
    PostOfFollowingSuccess ,
    PostOfFollowingFailure,

} from "../Reducers/PostsFollowing";
import Cookies from "js-cookie";



export const getFollowingPosts = ()=> async (dispatch)=>{
    try {

        dispatch(PostOfFollowingRequest());

        const {data} = await axios.get("https://social-media-app-backend-three.vercel.app/post/posts?token="+Cookies.get("token"));

        dispatch(PostOfFollowingSuccess(data.posts))

 
        
    } catch (error) {
        dispatch(PostOfFollowingFailure(error.response.data.message));
    }
}

