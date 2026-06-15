import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";




// const verifyJwt = asyncHandler(async (req , res , next) => {
//     /**
//      * yah hmm accestoken lenge fir accestoken mai se user ki id lenge fir us id se user object find karunga then usme se password or refreshtoken hatake sab lelunga 
//      * new user object banake usme user daal dunga
//      * next() middleware ko call kr dunga
//      */

    

//     try {
//         // step 1 : get accesstoken from cookie
//         const token = req.cookie.accessToken || req.header("Authorization").replace("Bearer ", "");

//         // step 2 token decode karo jwt.verify se
        
//        const decodedToken  =  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

//        // step 3 user find karunga database mai 
//        const user = await User.findById(docodedToken._id).select("-password -refreshToken")

//        // step 4 check user aaya ya nhi 
//        if(!user) throw new apiError(401 , "Invalid access token ");

//        // step 5 if user is exist then new user object banake user ko return kardo
//        req.user = user; // ye hm isliye kar rahe hai kyuki pura verify ke baad req ma user name ka object daal diya hai toh controller mai logout method mai hm ab easily user._id ko access kar sakte haiand cookie bhi leke ,jp]Zxc unko remove kar sakte hai 
//        next();


//     } catch (error) {
//         throw new apiError(400 , "something went wrong in token verification ")
        
//     }
// })

const isLoggesIn = asyncHandler(async (req , res , next)=> {
    try {
        // step 1 : accesstoken lena
        const token = req.cookies.accessToken || req.header.authorization?.replace("Bearer ", "");
    
        // step 2 : decode token using jwt.verify
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
    
        // step 3 : find user 
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    
        // step 4 :check user is exist or not 
        if(!user) throw new apiError(400, "invalid access token ");
    
    
        // step 5 : if user is correct i.e accestoken sahi hai 
    
        req.user = user;
        next();
    } catch (error) {
        throw new apiError(400 , "invalid access token");
        next(error);
        
    }
})

export {isLoggesIn};