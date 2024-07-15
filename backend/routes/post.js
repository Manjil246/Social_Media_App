import express from "express"
const router = express.Router()
import Post from "../models/Post.js"
import User from "../models/User.js"
import fetchuser from "../middleware/fetchuser.js"
import cloudinary from "cloudinary"




//Create Post
router.post("/createpost",fetchuser,async (req,res) =>{
    try {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.image,{
            folder:"posts"
        })

        const newPostData = {
            caption:req.body.caption,
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            },
            owner:req.user._id
        }
    
        const newPost = await Post.create(newPostData);

        const user = await User.findById({_id:req.user._id})
        user.posts.push(newPost._id)
        await user.save()

        res.status(201).json({success:true,message:"Post Created"});

    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

router.delete("/deletepost/:id",fetchuser,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(500).json({success:false,message:"Post not found."})
        }

        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(500).json({success:false,message:"Unauthorized"})
        }

        await cloudinary.v2.uploader.destroy(post.image.public_id)

        await Post.findByIdAndDelete({_id:req.params.id});

 
        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index,1);
        await user.save();

        return res.status(200).json({success:true,message:"Post deleted"})

    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})


router.get("/likeandunlike/:id",fetchuser,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(500).json({success:false,message:"Post not found"})
        }
        if(post.likes.includes(req.user._id)){
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index,1)
            await post.save();
            return res.status(200).json({success:true, message:"Unliked Post"})
        }else{
            post.likes.push(req.user._id)
            await post.save();
            return res.status(200).json({success:true, message:"Liked Post"})
        }
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

router.get("/posts",fetchuser,async (req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        const following = user.following;

        const posts = await Post.find({
            owner : {
                $in : following
            }
        }).populate("owner likes comments.user")

        return res.status(200).json({success:true,posts:posts.reverse()});
    } catch (error) {
        res.status(500).status({success:false,message:error.message})
    }
})


router.put("/updatecaption/:id",fetchuser,async (req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(500).json({success:false,message:"Post not found"})
        }

        if(post.owner.toString() !== user._id.toString()){
            return res.status(500).json({success:false,message:"Unauthorized User"})
        }

        post.caption = req.body.caption;
        await post.save();

        res.status(200).json({success:true,message:"Post Updated"})

    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

router.put("/addupdatecomment/:id",fetchuser, async (req,res)=>{
    try {
        const postToComment = await Post.findById(req.params.id);

        if(!postToComment){
            return res.status(500).json({success:false,message:"Post not Found"})
        }

        let commentIndex = -1;
        postToComment.comments.forEach((comment,index)=>{
            if(comment.user.toString() === req.user._id.toString()){
                commentIndex = index;
            }
        })
        if (commentIndex !== -1) {
            postToComment.comments[commentIndex].comment = req.body.comment;
            await postToComment.save();
            return res.status(200).json({success:true,message:"Comment Updated"})
        } else {
            postToComment.comments.push({user:req.user._id, comment:req.body.comment})
            await postToComment.save();
            return res.status(200).json({success:true,message:"Comment Added"})
        } 

    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

// Deleting comment from a post
router.delete("/deletecomment/:id",fetchuser,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(500).json({success:false,message:"Post not Found"});
        }

        // If the owner of the post wants to delete: He can delete anyone's comment
        if(post.owner.toString()===req.user._id.toString()){
            if(req.body.commentId === undefined){
                return res.status(400).json({success:false,message:"Comment Id required"})
            }
            let commentIndex = -1;
            post.comments.forEach((comment,index)=>{
                if(comment._id.toString() === req.body.commentId.toString()){
                    commentIndex = index;
                }
            })
            if(commentIndex === -1){
                return res.status(400).json({success:false,message:"Comment not Found"})
            }
            else{
                post.comments.splice(commentIndex,1);
                await post.save();
                return res.status(200).json({success:true,message:"Comment Deleted"})
            }
        
        //If not the owneR then check if the comment belongs to the commentator
        }else{
            let commentIndex = -1;
            post.comments.forEach((comment,index)=>{
                if(comment.user.toString() === req.user._id.toString()){
                    commentIndex = index;
                }
            })
            if(commentIndex === -1){
                res.status(500).json({success:false,message:"Comment not Found"})
            }
            else{
                post.comments.splice(commentIndex,1);
                await post.save();
                return res.status(200).json({success:true,message:"Your Comment Deleted"})
            }
               
        }

    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
})



router.get("/my/posts",fetchuser,async (req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        const posts = [];

        for(let i = 0;i<user.posts.length;i++){
            const post  = await Post.findById(user.posts[i]).populate("likes comments.user");
            posts.push(post);
        }

        return res.status(200).json({success:true,posts:posts.reverse()});
    } catch (error) {
        res.status(500).status({success:false,message:error.message})
    }
})


router.get("/userposts/:id",fetchuser,async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const posts = [];

        for(let i = 0;i<user.posts.length;i++){
            const post  = await Post.findById(user.posts[i]).populate("likes comments.user");
            posts.push(post);
        }

        return res.status(200).json({success:true,posts:posts.reverse()});
    } catch (error) {
        res.status(500).status({success:false,message:error.message})
    }
})



export default router