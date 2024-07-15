import jwt from "jsonwebtoken"
import User from "../models/User.js"

const fetchuser = async (req,res,next)=>{

    const {token} = req.cookies;

    if(!token){
        return res.status(400).json({success:false,message:"Please login first"})
    }
    const data = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(data._id);

    next();
}

export default fetchuser;