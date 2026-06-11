import { Router } from "express";
import { registerUser } from "../controller/registerUser.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

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

export default userRouter;