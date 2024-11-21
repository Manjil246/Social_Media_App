import axiosUser from "../auth/user";
import {
  UserProfileRequest,
  UserProfileFailure,
  UserProfileSuccess,
} from "../Reducers/UserProfile";

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch(UserProfileRequest());

    const { data } = await axiosUser.get(
      `/user/getuserprofile/${id}`
    );

    dispatch(UserProfileSuccess(data.user));
  } catch (error) {
    dispatch(UserProfileFailure(error.response.data.message));
  }
};
