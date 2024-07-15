import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required: [true,"Please enter a Name"]
    },
    avatar:{
        public_id:String,
        url:String, 
    },
     email:{
        type: String,
        required:[true, "Please enter an Email"],
        unique : [true,"Email already exists" ]
     },
     password: {
        type: String,
        required: [true,"Please enter a Password"],
        minlength: [6,"Password should be at least 6 characters"],
        select: false
     },
     posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
     ],
     followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
     ],
     following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
     ],
     resetPasswordToken : String,
     resetPasswordExpire : Date


})



export default mongoose.model("User",userSchema)