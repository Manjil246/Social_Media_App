import {connectToMongo} from "./db.js";
import express from "express";
import user from "./routes/user.js"
import post from "./routes/post.js"
import cookieParser from "cookie-parser"
const app = express();
import dotenv from "dotenv"
dotenv.config();
import cloudinary from "cloudinary"


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






import path from 'path';
import { fileURLToPath } from 'url';


// Determine the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all handler for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});
