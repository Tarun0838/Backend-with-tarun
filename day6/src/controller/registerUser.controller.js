import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadCoudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req , res)=>{

    /**
     * steps to follow for register the user
     * 1 . get user detail from frontend / postman
     * 2. validation (koi bhi field empty nhi hona chaiye)
     * 3. check if user already exist karta hai ya nhi
     * 4. check for images , check for avatar upload hue hai ya nahi
     * 5. upload image to cloudinary
     * 6. create user object . create entry in database
     * 7. remove password and accessToken field from response
     * 8. check for user creation 
     * 9. return response
     */

    // step 1 : get user detail from frontend /postman

    const {fullName , username , email , password} = req.body;
    // console.log("fullname : ", fullName);
    // console.log("email : ", email);
    

    // step 2: validation 
    if(
        [fullName, username, email , password].some((field)=> field?.trim() === " ")
    ){
        throw new apiError(400 , "all fields are required ");
    }

    // step 3 : check if user is already exists or not
    const existingUser = User.findOne({
        $or : [ { email } , {username}]
    })

    if(existingUser){
        throw new apiError(409, "user is already exist with this username and email ")

    }

    // step 4 : check for coverImage and avatar ki vo upload hue hai ya nhi local sever par

    // localpath
    const avatarLocalPath =  req.files?.avatar[0]?.path;
    const coverImageLocalPath =  req.files?.avatar[0]?.path;
    if(!avatarLocalPath){
        throw new apiError(400 , "Avartar image is not uploaded ");
    }

    // step 5 : upload to cludinary 
    const avatar = await uploadCoudinary(avatarLocalPath);
    const coverImage = await uploadCoudinary(coverImageLocalPath);

    if(!avatar){
        throw new apiError(400 , "avatar image is not uploaded correctlyy ");
    }
    
    // step 6 : create user object and create entry in db
    const user = await User.create({
        fullName, 
        username, 
        email,
        avatar : avatar.url,
        coverImage : coverImage?.url || " ",
        password,
    })
    
    // step 7 : remove password and accessToken from response ya user
   const createdUser = await User.findById(user._id).select("-password -accessToken");

   // step 8 : check user is created or not 
   if(!createdUser){
    throw new apiError(500, "something went wrong while registering the user ");
   }

   // step 9  : return response 
   return res.status(200).json(
    new apiResponse(201 , createdUser , "user is registered Sucessfullly")
   )

})

export {registerUser};