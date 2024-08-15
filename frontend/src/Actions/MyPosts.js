import axios from "axios";
import { 
    MyPostsRequest,
    MyPostsFailure,
    MyPostsSuccess
 } from "../Reducers/MyPosts";



export const getMyPosts = ()=> async (dispatch)=>{
    try {

        dispatch(MyPostsRequest());

        const {data} = await axios.get("https://social-media-app-backend-gamma.vercel.app/post/my/posts");

        dispatch(MyPostsSuccess(data.posts))

 
        
    } catch (error) {
        dispatch(MyPostsFailure(error.response.data.message));
    }
}