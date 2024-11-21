import {
  AllUsersRequest,
  AllUsersSuccess,
  AllUsersFailure,
} from "../Reducers/AllUsers";
import axiosUser from "../auth/user";

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch(AllUsersRequest());

      const { data } = await axiosUser.get(`/user/getallusers?name=${name}?`);

      dispatch(AllUsersSuccess(data.users));
    } catch (error) {
      dispatch(AllUsersFailure(error.response.data.message));
    }
  };
