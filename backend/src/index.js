import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./lib/socket.js";

import path from "path";

dotenv.config();
// const app=express();

//now we import app from socket.js for realtime chatting




app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    
}))


const port=process.env.PORT;
const __dirname=path.resolve();

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));


    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

server.listen(port,()=>{
    console.log(`server is running on port ${port} successfully`);
    connectDB();
});
// app.listen(port,()=>{
//     console.log(`server is running on port ${port} successfully`);
//     connectDB();
// });