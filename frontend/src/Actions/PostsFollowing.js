
import axiosUser from "../auth/user";
import {
  PostOfFollowingRequest,
  PostOfFollowingSuccess,
  PostOfFollowingFailure,
} from "../Reducers/PostsFollowing";

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch(PostOfFollowingRequest());

    const { data } = await axiosUser.get(
      "/post/posts"
    );

    dispatch(PostOfFollowingSuccess(data.posts));
  } catch (error) {
    dispatch(PostOfFollowingFailure(error.response.data.message));
  }
};
