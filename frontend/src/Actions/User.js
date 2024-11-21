import axios from "axios";
import {
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  RegisterRequest,
  RegisterSuccess,
  RegisterFailure,
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFailure,
  LogoutUserRequest,
  LogoutUserFailure,
  LogoutUserSuccess,
  UpdateUserFailure,
  UpdateUserSuccess,
  UpdateUserRequest,
  DeleteProfileSuccess,
  DeleteProfileFailure,
  DeleteProfileRequest,
} from "../Reducers/User";
import Cookies from "js-cookie";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(LoginRequest());

    const { data } = await axios.post(
      "https://social-media-app-backend-three.vercel.app/user/login",
      { email, password, token: Cookies.get("token") },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    Cookies.set("token", data.token);

    dispatch(LoginSuccess(data));
  } catch (error) {
    dispatch(LoginFailure(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());

    const { data } = await axios.get(
      "https://social-media-app-backend-three.vercel.app/user/myprofile"
    );

    dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(LoadUserFailure(error.response.data.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(LogoutUserRequest());

    const { data } = await axios.get(
      "https://social-media-app-backend-three.vercel.app/user/logout",
      { token: Cookies.get("token") },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    Cookies.set("token", null);

    dispatch(LogoutUserSuccess(data.message));
  } catch (error) {
    dispatch(LogoutUserFailure(error.response.data.message));
  }
};

export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch(RegisterRequest());

      const { data } = await axios.post(
        `https://social-media-app-backend-three.vercel.app/user/createuser`,
        { name, email, password, avatar, token: Cookies.get("token") },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Cookies.set("token", data.token);

      dispatch(RegisterSuccess(data));
    } catch (error) {
      dispatch(RegisterFailure(error.response.data.message));
    }
  };

export const updateUser = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch(UpdateUserRequest());

    const { data } = await axios.put(
      `https://social-media-app-backend-three.vercel.app/user/updateprofile`,
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(UpdateUserSuccess(data));
  } catch (error) {
    dispatch(UpdateUserFailure(error.response.data.message));
  }
};

export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch(DeleteProfileRequest());

    const { data } = await axios.delete(
      `https://social-media-app-backend-three.vercel.app/user/deleteuser`
    );

    dispatch(DeleteProfileSuccess(data.message));
  } catch (error) {
    dispatch(DeleteProfileFailure(error.response.data.message));
  }
};
