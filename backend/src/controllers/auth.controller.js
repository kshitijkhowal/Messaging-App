import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//signup
export const signup=async (req,res)=>{
    const {fullName,email,password} =req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"all fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message:"password has to be atleast 6 characters long"});
        }
        const user=await User.findOne({email});

        if(user) return res.status(400).json({message: "Email already Exist"});

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName:fullName,
            email:email,
            password:hashedPassword,
        })

        if(newUser){
            //to save the user generate JWT Token
            //this token generation is in lib/utils.js
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(400).json({message:"Invalid user Data"});
        }
    } catch (error) {
        console.log("errpr in signup Controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

//login
export const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        
        const isPassCorrect=await bcrypt.compare(password,user.password);

        if(!isPassCorrect)  return res.status(400).json({message: "Invalid Credentials"});

        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })

    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"internal server error"})
    }
};

//logout
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out Successfully"});
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"internal server error"})
        
    }
};

//update Profile
export const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user._id;
        
        if(!profilePic){
            return res.status(404).json({message:"profile photo is required"});
        }
        
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser=await User.findOneAndUpdate(userId,
            {
                profilePic:uploadResponse.secure_url,            
            },
            {
                new:true,
            },)
            
            res.status(200).json(updatedUser);
            
            
        } 
    catch (error) {
        console.log("Error in upldate profile controller",error.message);
        res.status(500).json({message:"internal server error"})
            
    }
}

//check auth
export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller",error.message);
        res.status(500).json({message:"internal server error"})
    }
}