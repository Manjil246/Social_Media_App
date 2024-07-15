import axios from "axios";
import { 
    MyPostsRequest,
    MyPostsFailure,
    MyPostsSuccess
 } from "../Reducers/MyPosts";


export const getMyPosts = ()=> async (dispatch)=>{
    try {

        dispatch(MyPostsRequest());

        const {data} = await axios.get("/post/my/posts");

        dispatch(MyPostsSuccess(data.posts))

 
        
    } catch (error) {
        dispatch(MyPostsFailure(error.response.data.message));
    }
}