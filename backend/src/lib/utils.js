import jwt from "jsonwebtoken";

export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    })

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //ms
        httpOnly:true,  //prevents XSS crosssite scripting attacks
        sameSite:"strict", //CSRF attacks cross site req forgery
        secure:process.env.Node_ENV!=="develoment",
    })

    return token;
}