import axios from "axios";
import {
  MyPostsRequest,
  MyPostsFailure,
  MyPostsSuccess,
} from "../Reducers/MyPosts";
import Cookies from "js-cookie";

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch(MyPostsRequest());

    const { data } = await axios.get(
      `https://social-media-app-backend-three.vercel.app/post/my/posts?token=${Cookies.get(
        "token"
      )}`
    );

    dispatch(MyPostsSuccess(data.posts));
  } catch (error) {
    dispatch(MyPostsFailure(error.response.data.message));
  }
};
