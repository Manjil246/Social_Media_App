import axiosUser from "../auth/user";
import {
  MyPostsRequest,
  MyPostsFailure,
  MyPostsSuccess,
} from "../Reducers/MyPosts";

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch(MyPostsRequest());

    const { data } = await axiosUser.get(
      `/post/my/posts
      )}`
    );

    dispatch(MyPostsSuccess(data.posts));
  } catch (error) {
    dispatch(MyPostsFailure(error.response.data.message));
  }
};
