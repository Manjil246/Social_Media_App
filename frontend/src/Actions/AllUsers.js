import axios from "axios";
import{
    AllUsersRequest,
    AllUsersSuccess,
    AllUsersFailure,
} from "../Reducers/AllUsers"

export const getAllUsers = (name="")=>async (dispatch)=>{
    try {
        dispatch(AllUsersRequest());

        const {data} = await axios.get(`https://social-media-app-backend-three.vercel.app/user/getallusers?name=${name}`);

        dispatch(AllUsersSuccess(data.users))

    } catch (error) {
        dispatch(AllUsersFailure(error.response.data.message))
    }
}