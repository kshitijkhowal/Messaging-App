import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

//get list of users
export const getUsersForSidebar=async(req,res)=>{
    try {
        const loggenInUserId=req.user._id;
        const filteredUsers= await User.find({_id:{$ne:loggenInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar route",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

//get all messages b/w 2 users
export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId,recieverId:userToChatId},
                {senderId:userToChatId,recieverId:myId},
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in get messages controller",error.message);
        res.status(500).json({message:"internal server error"});
    }
}

//send a message
export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:recieverId}=req.params;
        const myId=req.user._id;

        let imageUrl;

        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId:myId,
            recieverId:recieverId,
            text:text,
            image:imageUrl,
        });

        await newMessage.save();

        //todo : realtime functionality  ==>socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send massage route",error.message);
        res.status(500).json({message:"internal server error"});
    }
}