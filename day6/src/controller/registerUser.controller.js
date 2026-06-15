import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadCoudinary } from "../utils/cloudinary.js";
import { use } from "react";


const generateAccessTokenAndRefreshToken = async (userId) => {

    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500 , "Something went wrong by server while generating Access and Refresh token ");
    }





}

const registerUser = asyncHandler(async (req, res) => {

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

    const { fullname, username, email, password } = req.body;
    // console.log("fullname : ", fullName);
    // console.log("email : ", email);


    // step 2: validation 
    if (
        [fullname, username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "all fields are required ");
    }

    // step 3 : check if user is already exists or not
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existingUser) {
        throw new apiError(409, "user is already exist with this username and email ")

    }

    // step 4 : check for coverImage and avatar ki vo upload hue hai ya nhi local sever par

    // localpath
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath =  req.files?.coverImage[0]?.path;

    // yah hm check kare rahe hai ki jo coveriamge hai agar usme image upload ho jaye to url dedo nhi to mat do " " rehne do 

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }


    if (!avatarLocalPath) {
        throw new apiError(400, "Avartar image is not uploaded ");
    }

    // step 5 : upload to cludinary 
    const avatar = await uploadCoudinary(avatarLocalPath);
    const coverImage = await uploadCoudinary(coverImageLocalPath);
    // console.log("avatar url ", avatar);
    // console.log("coverImage  url ", coverImage);

    if (!avatar) {
        throw new apiError(400, "avatar image is not uploaded correctlyy ");
    }

    // step 6 : create user object and create entry in db
    const user = await User.create({
        fullname,
        username,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || " ",
        password,
    })

    // step 7 : remove password and accessToken from response ya user
    const createdUser = await User.findById(user._id).select("-password -accessToken");

    // step 8 : check user is created or not 
    if (!createdUser) {
        throw new apiError(500, "something went wrong while registering the user ");
    }

    // step 9  : return response 
    return res.status(200).json(
        new apiResponse(201, createdUser, "user is registered Sucessfullly")
    )

})

// const loginUser = asyncHandler(async (req, res) => {
//     // step to follow for login a user

//     /**
//      * req body  => data 
//      * check username and email (ayee hai ya nhi )
//      * find user with given username and email
//      * password check
//      * access and refresh token generate 
//      * send cookie (basically refresh token and access token in the form of cookie )
//      * return response
//      */

//     // step 1 : ger data from req.body
//     const { username, password, email } = req.body;

//     // step 2 : check username and email 
//     if (!username || !email) throw new apiError(400, "Username or email is required ");

//     // or agar dono chiz agayi tab user check karunga hai ya nhi 
//     // step 3 : check user is available or not 
//     const user = await User.findOne({
//         $or: [{ username }, { email }],
//     })

//     if (!user) throw new apiError(404, "user not found ");

//     // step 4: now check passowrd is correct or not 

//     const isPasswordValid = await user.isPasswordCorrect(password);

//     if (!isPasswordValid) throw new apiError(401, "Password is inCorrect");

//     // step 5 generate access token and refresh token 

//    const {accessToken , refreshToken} = await generateAccessTokenAndRefreshToken(user._id);

//    const LoggedInUser = await User.findById(user._id).select("-password -refreshToken")

//    const option = {
//         httpOnly : true,
//         secure : true,
//    }

//    return res
//    .status(200)
//    .cookie("accessToken", accessToken, option)
//    .cookie("refreshToken", refreshToken, option)
//    .json(
//     new apiResponse(
//         200,
//         {
//             user : LoggedInUser , accessToken , refreshToken
//         },
//         "User Logges In Successfully"
//     )
//    )
   






// })

const loginUser = asyncHandler(async (req, res)=> {
    // step 1 : req.body = data
    const {username , email , password} = req.body;

    // step 2 : validate email and username 
    if(!username && !email){
        throw new apiError(400, "username and email is required for login");
    }
    
    // step 3: check user is available or not with given username and email

    const user = await User.findOne({
        $or : [ {username } , {email} ],
    })
    if(!user) throw new apiError(400 , "user is not found ");

    // step 4 : if usre is available then check for password 
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new apiError(400 , "password is inCorrect ");
    }

    // step 5 if password is correct then access an refreshtoken generate karo 

   const {accessToken , refreshToken} =  await generateAccessTokenAndRefreshToken(user._id)

   // also we have to remove password and refesh token 
   const LoggedInUser = await User.findById(user._id).select("-password -refreshToken")

   const option = { // isse kya hoga ki cookie mai modificaton sirf server se hoga

    httpOnly : true,
    secure : true,
   }

   res.status(200)
   .cookie("accessToken", accessToken , option)
   .cookie("refreshToken", refreshToken , option)
   .json(
    new apiResponse(
        200,
        {
            user : LoggedInUser , accessToken , refreshToken
        }
        ,
        "User is LoggedIn Succesfully ",
    )
   )

})



const logoutUser = asyncHandler( async (req , res , next) => {
    try {
        // step 1 : user find karo 
       await  User.findByIdAndUpdate(
            req.user._id,
            {
                $set : {refreshToken : undefined},
            },
            {
               new : true, 
            }

        )

        // step 2 : option do 
        const option = {
            httpOnly : true,
            secure : true
        }

        // step 3 : clear cookie
        res.status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(
            new apiResponse(200 , {}, "User LoggedOut Successfully")
        )

    } catch (error) {
        throw new apiError(500, "something went wrong ");
    }

}) 

const loginAccessRefreshToken = asyncHandler(async (req, res)=> {
    try {
        // step 1 getting refresh token 
        const incomingRefreshToken = await req.cookie.refreshToken || req.body.refreshToken;
        if(!incomingRefreshToken) throw new apiError(401, "refresh token not found ");

        // step 2 verify with jwt .veryify

       const decodedRefreshToken = await jwt.verify(incomingRefreshToken , process.env.ACCESS_TOKEN_SECRET);

       // step 3 find user with this decodedrefreshtoken 
       const user = User.findById(decodedRefreshToken._id);
       if(!user ) throw new apiError(404, "User not found ");

       // step 4 compare database refresh token with decoded refresh token

       if(decodedRefreshToken !== user.refreshToken) throw new apiError(401 ," invalid access token ");

       // step 5 generate new access and refresh token 
      const {accessToken , newrefreshToken}  = await generateAccessTokenAndRefreshToken(decodedRefreshToken._id);

      // step 6 send with cookie 
      const option = {
        httpOnly : true,
        secure : true,
      }

      req.status(200)
      .cookie("accessToken" , accessToken , option)
      .cookie("refreshToken", refreshToken, option)
      .json(
        new apiResponse(
            200,
            {accessToken : accessToken , refreshToken : newrefreshToken},
            "new access token generated "

        )
      )


    } catch (error) {
        throw new apiError(error?.message || "invalid access token ")
    }
})


const changeCurrentPassword = asyncHandler(async (req , res )=> {
    // step 1 : get old and newpassword from user

    const {oldPassword , newPassword} = req.body;

    // step 2 : check oldPassword is equal with database password
    const user = await User.findById(req.user._id)
   const  ispasswordCorrect = await user.isPasswordCorrect(oldPassword)
   if(!ispasswordCorrect) throw new apiError(400 , "invalid old password ")

    // step 3 update password
    use.password = newPassword;
    // step 4 save bhi karna padega
    user.save({validateBeforeSave: false})

    // return response
    res.status(200).json(
        new apiResponse(200 , {} , "Your Current password is changed Successfully")

    )
})

const getCurrentUser = asyncHandler(async (req, res)=>{
    return res.status(200).json(
        new apiResponse(200 , req.user , "current user is fetched Successfully")
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    loginAccessRefreshToken,
    changeCurrentPassword,
    getCurrentUser

};