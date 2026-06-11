import asyncHandler from "../utils/asyncHandler";

const userRegister = asyncHandler((req, res)=>{
    res.status(200).json({
        message : "User is registered Sucessfully",
    })
})

export {userRegister}