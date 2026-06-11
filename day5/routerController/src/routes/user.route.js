import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

// now ab route likhenge yah
router.route("/register").post(
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
);
// router.route("/login").post(loginUser);

export {router};

