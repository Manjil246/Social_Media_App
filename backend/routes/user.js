import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Post from "../models/Post.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";
import sendEmail from "../middleware/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

//Route 1:Create User
router.post("/createuser", async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(password, salt);

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).send({ success: false, message: "Email Already Exists" });
    } else {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "profile",
      });

      user = await User.create({
        name,
        email,
        password: secPass,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res
        .status(200)
        .cookie("token", token, {
          maxAge: 90 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({
          success: true,
          token,
          message: "Registered and Logged In successfully",
          user,
        });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");

    if (!user) {
      res.status(500).json({ success: false, message: "User doesnt exist" });
    } else {
      const passwordCompare = await bcryptjs.compare(password, user.password);
      if (!passwordCompare) {
        res.status(500).json({ success: false, message: "Incorrect Password" });
      } else {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res
          .status(200)
          .cookie("token", token, {
            maxAge: 90 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .json({ success: true, token, user });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/logout", fetchuser, async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: "social-media-app-g7fd.vercel.app",
        path: "/",
      })
      .json({ success: true, message: "Logged out Successfully" });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
});

//Follow
router.get("/followuser/:id", fetchuser, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!userToFollow) {
      return res
        .status(500)
        .json({ success: false, message: "User not Found" });
    }

    //If already followed
    if (loggedInUser.following.includes(userToFollow._id)) {
      const index1 = loggedInUser.following.indexOf(userToFollow._id);
      loggedInUser.following.splice(index1, 1);
      await loggedInUser.save();

      const index2 = userToFollow.followers.indexOf(loggedInUser._id);
      userToFollow.followers.splice(index2, 1);
      await userToFollow.save();

      return res
        .status(200)
        .json({ success: true, message: "User Unfollowed" });
    }
    //To follow if already not followed
    else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);
      await loggedInUser.save();
      await userToFollow.save();

      return res.status(200).json({ success: true, message: "User Followed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/updatepassword", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword && !newPassword) {
      return res
        .status(500)
        .json({ success: false, message: "please enter old and new password" });
    }

    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(500)
        .json({ success: false, message: "Old password doesn't match" });
    } else {
      const salt = await bcryptjs.genSalt(10);
      const newPasswordHashed = await bcryptjs.hash(newPassword, salt);

      user.password = newPasswordHashed;
      await user.save();

      res
        .status(200)
        .json({ success: true, message: "Password Updated Successfully" });
    }
  } catch (error) {
    res.send(500).json({ success: false, message: error.message });
  }
});

router.put("/updateprofile", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, avatar } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "profile",
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await user.save();
    res.status(200).json({ success: true, user, message: "Profile Updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/deleteuser", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    const posts = user.posts;

    //Someone is following me then remove my id from following list from his account
    //My followers list
    const followers = user.followers;

    for (let i = 0; i < followers.length; i++) {
      //The user who follows you
      let follower = await User.findById(followers[i]);

      //Following list the user that follows you
      let following = follower.following;

      //Find index of the deleted user id
      let index = following.indexOf(user._id);

      //Delete the user id from the following list
      following.splice(index, 1);
      follower.following = following;

      await follower.save();
    }

    //I am following someone then remove my id from his followers list
    //My following list
    const following = user.following;

    for (let i = 0; i < following.length; i++) {
      let followin = await User.findById(following[i]);

      //Follower list of the user that you are following
      let follower = followin.followers;

      //Find the index of the my id
      let index = follower.indexOf(user._id);

      //Remove my id
      follower.splice(index, 1);

      followin.followers = follower;
      followin.save();
    }

    //Removing all comments of the user from all post
    const allPosts = await Post.find();
    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);
      for (let j = 0; j < post.comments.length; j++) {
        const comment = post.comments[j];
        if (comment.user === user._id) {
          post.comments.splice(j, 1);
          break;
        }
      }
      await post.save();
    }
    //Removing all likes of the user from all post
    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);
      for (let j = 0; j < post.likes.length; j++) {
        const userLiked = post.likes[j];
        if (userLiked === user._id) {
          post.likes.splice(j, 1);
          break;
        }
      }
      await post.save();
    }

    await User.findByIdAndDelete(user._id);
    res.cookie("token", null, {
      maxAge: 0,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    //Remove posts of user
    for (let i = 0; i < posts.length; i++) {
      let post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await Post.findByIdAndDelete(post._id);
    }

    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/myprofile", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

router.get("/getuserprofile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "User not Found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({
      name: {
        $regex: req.query.name,
        $options: "i",
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    // const resetUrl = `${req.protocol}://${req.get("host")}/reset/password/${resetToken}`
    const resetUrl = `${req.protocol}://localhost:3000/reset/password/${resetToken}`;
    const message = `Reset Your Password By Clicking in the Link Below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });
      res
        .status(200)
        .json({ success: true, message: `Email Sent to ${user.email}` });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(200).json({ success: false, message: error.message });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

router.put("/forgotpassword/reset/:token", async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token Expired or Invalid" });
    }
    const salt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(req.body.password, salt);
    user.password = secPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password Successfully updated" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

export default router;
