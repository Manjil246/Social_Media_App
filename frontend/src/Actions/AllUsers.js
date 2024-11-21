import axios from "axios";
import{
    AllUsersRequest,
    AllUsersSuccess,
    AllUsersFailure,
} from "../Reducers/AllUsers"
import Cookies from "js-cookie";

export const getAllUsers = (name="")=>async (dispatch)=>{
    try {
        dispatch(AllUsersRequest());

        const {data} = await axios.get(`https://social-media-app-backend-three.vercel.app/user/getallusers?name=${name}?token=${Cookies.get("token")}`);

        dispatch(AllUsersSuccess(data.users))

    } catch (error) {
        dispatch(AllUsersFailure(error.response.data.message))
    }
}