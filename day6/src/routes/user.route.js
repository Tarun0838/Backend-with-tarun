import { Router } from "express";
import { loginUser, registerUser  , logoutUser, loginAccessRefreshToken} from "../controller/registerUser.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import {isLoggesIn} from "../middlewares/auth.middleware.js";

/**
 * now ab hm ya middlware ka use karenge so that jab bhi register par request aye toh  registerUser par jaane se phele ab file upload karde multer ke through basically images 
 */
const userRouter = Router();
userRouter.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1,
        },
        {
            name : "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser
)

userRouter.route("/login").post(loginUser);

// secure rotues
userRouter.route("/logout").post(isLoggesIn , logoutUser)
userRouter.route("/refresh-token").post(loginAccessRefreshToken);

export {
    
    userRouter

};