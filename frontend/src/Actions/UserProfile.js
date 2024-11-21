import axios from "axios";
import {
  UserProfileRequest,
  UserProfileFailure,
  UserProfileSuccess,
} from "../Reducers/UserProfile";
import Cookies from "js-cookie";

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch(UserProfileRequest());

    const { data } = await axios.get(
      `https://social-media-app-backend-three.vercel.app/user/getuserprofile/${id}?token=${Cookies.get(
        "token"
      )}`
    );

    dispatch(UserProfileSuccess(data.user));
  } catch (error) {
    dispatch(UserProfileFailure(error.response.data.message));
  }
};
