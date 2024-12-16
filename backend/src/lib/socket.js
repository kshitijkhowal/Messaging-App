import {Server} from "socket.io";
import http from "http";
import express from "express";

const app=express();
const server=http.createServer(app);


//socket io new server
const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
});


export function getReceiverSocketId(userId){
    return userSocketMap[userId];
};


//used to store online users

const userSocketMap={};  //{userId : socketId}

//trying to listen

io.on("connection",(socket)=>{
    console.log("A user Connected",socket.id);

    const userId=socket.handshake.query.userId;   //fetch userId from database
    if(userId) userSocketMap[userId]=socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap));  //send event to all the clients

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id);
        //for deleting this user from user coket map
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
})

export {io,app,server};
