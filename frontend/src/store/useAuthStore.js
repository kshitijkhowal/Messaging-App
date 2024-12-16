import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast, { Toaster } from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL="http://localhost:5001";  //backend url

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  socket:null,    //for realtime

  isCheckingAuth: true,
  onlineUsers:[],


  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      //for realtime functionality
      get().connectSocket();
      //
    } catch (error) {
      console.log("Error in checkAuth: ", error)
      set({ authUser: null });

    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      
      //for realtime functionality
      get().connectSocket();
      //
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      //for realtime functionality
      get().connectSocket();
      //
    } catch (error) {
      toast.error(error.response.data.message);
      
    } finally {
      set({ isLoggingIn: false });
    }
  },
  
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      //for realtime functionality
      get().disconnectSocket();
      //
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("profile updated Successfully");

    } catch (error) {
      console.log("error in uploading image", error);
      toast.error(error.response.data.message);

    } finally {
      set({ isUpdatingProfile: false });

    }
  },

  connectSocket:()=>{
    const {authUser}=get();

    //if user is either not authorised or already connected
    if(!authUser || get().socket?.connected) return;
    const socket=io(BASE_URL,{
      query:{
        userId:authUser._id,
      }
    });
    socket.connect();

    set({socket:socket});

    //listening for online users
    socket.on("getOnlineUsers",(userIds)=>{
      set({onlineUsers:userIds});
    })
  },
  disconnectSocket:()=>{
    if(get().socket?.connected) get().socket.disconnect();
  },
  
}
  
));