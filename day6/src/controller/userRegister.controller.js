import { response } from "express";
import { User } from "../models/user.model";
import apiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import { uploadCoudinary } from "../utils/cloudinary";
import apiResponse from "../utils/apiResponse";

// const userRegister = asyncHandler(async (req ,res )=>{
//     // ab mere ko yah use ko register karana hai 

//     // step 1 : get user detail from frontend / postman
//     const {fullName , username , email , password } = req.body;

//     // step2 : validation (koi bhi field empty na ho)

//     if([fullName , email , username, password].some((field)=> field?.trim() === " ")){
//         throw new apiError(400 , "All field are required.");
//     }

//     // step 3: check if user is already exist or not 
//    const existingUser = await  User.findOne({
//         $or: [ {username} , {email}]
//     })
//     if(existingUser) throw new apiError(401 , "User with email and username is already exist.");


//     // step 4: check for coverImage and avatar 
//     const avatarLocalPath =  req.files?.avatar[0]?.path;
//     const coverImageLocalPath =  req.files?.CoverImage[0]?.path;
//     if(!avatarLocalPath) throw new apiError(400 ,"avatar is required for registration ");

//     /**
//      * Note : coverImage ko change karne ki need nhi hai kyuiki usme required true nhi hai
//      * 
//      */

//     // step 5 : upload image to cloudinary
//     const avatar = await uploadCoudinary(avatarLocalPath)
//     const coverImage = await uploadCoudinary(coverImageLocalPath)

//     if(!avatar) throw new apiError(4002 , "avatar is not uploaded to cloudinary ");

//     // step 6 : create user object and create entry in db

//    const user = await  User.create({ // await karna padega db se baat kar rahe ho time lagega
//         username,
//         fullName,
//         password,
//         email,
//         avatar : avatar.url,
//         coverImage: coverImage?.url || " " // ho sakta hai nhi mile upload hi nhi hui ho 

//     })

//     // step 7 : remove password and refreshToken field from response 

//    const createdUser = await  User.findById(user._id).select("-password -refreshToken")

//    // step  8 : check for user creation 
//    if(!createdUser) throw new apiError(500 , "something happenden in server due to which register is not complete sucessfully try Again..");

// //    step 9 : return response

//     return res.status(201).json(
//         new apiResponse(200 , createdUser , "User is Registered Successfully "),
//     )


// })


const userRegister = asyncHandler( async (req , res)=> {
    /**
     * steps for registration 
     * 1. get user detail form postman or frontend
     * 2. validate the details 
     * 3. check if user is already exist or not 
     * 4. check for images and avatar ki vo locally upload hui ya na multer ke through
     * 5. now upload the image avatar and cover image to cloudinary 
     * 6. create user object , create entry in db
     * 7. remove password and refreshToken field from response
     * 8. check for usre creation 
     * 9. return response
     * 
     */

    // step 1 get the use details
    const {fullname , username , email , password} = req.body;

    // step 2 : validate the detail
    if([fullname , username , email , password].some((field)=> field?.trim == "")){
        throw new apiError(400 , "All the field are require for Registration ");
    }

    // step 3: check if user is already exist or not 

    const existingUser = await User.findOne({
        $or : [ {username} , {email} ]
    })

    if(existingUser){ throw new apiError(401 , "User is already exist with given username and email")}

    // step 4 : check for images , avatar
    // isko check karne ke liye hm multer ke andar jaake dekh sakte hai ki object ki form mai image store ho rahi hai so agar store hui hogi to length 0 se badi hogi

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    const coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
            coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath) throw new apiError(401 , "avatar image is not uploaded yet");

    // cover image ko check karne ki need nhi hai kyuiki vo user model mai required true nhi hai 

    // step 5 : upload to cloudinary

    const avatar = await uploadCoudinary(avatarLocalPath)
    const coverImage = await uploadCoudinary(coverImageLocalPath);


    // step 6 : create user object , create entry in db 

   const user = await  User.create({
        fullname : fullname.toLowerCase(),
        username , 
        email,
        password ,
        avatar : avatar.url,
        coverImage : coverImage.url
    })

    // step 7 :  

    const userData = User.findById(user._id).select("-password -refreshToken")

    // step  8 : check for user creation 
    if(!user){
        throw new apiError(500 , "something went wrong by server ");
    }

    req.status(200).json(
        new apiResponse(
            200 ,
            userData,
            "Register user Succesfully ",
        )
    )


})