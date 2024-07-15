import {connectToMongo} from "./db.js";
import express from "express";
import user from "./routes/user.js"
import post from "./routes/post.js"
import cookieParser from "cookie-parser"
const app = express();
import dotenv from "dotenv"
dotenv.config();
import cloudinary from "cloudinary"



var cors = require(cors());
app.use(cors());
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);



cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})




app.use(express.json({limit:'50mb'}))
app.use(cookieParser())


const port = process.env.PORT;

connectToMongo();

// app.get("/",(req,res)=>{
//     res.send("Hello World")
// })


//Routes
app.use("/user",user)
app.use("/post",post)


app.listen(port,()=>{
    console.log(`Social media app running at http://localhost:${port}`)
})


