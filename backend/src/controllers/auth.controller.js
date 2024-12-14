import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup=async (req,res)=>{
    const {fullName,email,password} =req.body;
    try {
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

export const login=(req,res)=>{
    res.send("login route");
};

export const logout=(req,res)=>{
    res.send("logout route");
};