import { requestHandler } from "../utils/requestHandler.js";
import ApiError from "../utils/apiError.js";
import {User} from "../models/user.model.js"
// ye mera conroller ban gaya 

const registerUser = requestHandler( async (req , res)=> {
    const {fullName , email , password , username} = req.body;
    console.log("full name : ", fullName);
    console.log("email : ", email);
    console.log("password : ", password);
    console.log("username : ", username);

    // validation karna hai

    if(
        [fullName , email , password , username].some((field)=> field?.trim() == "")
    ){
        throw new ApiError(400 , "All fields are required ");
    }

    /**
     * if() parenthsis ke andar condition ki jagah humne array pass kiya fir sume some()
     * mthod lagaya some() method traverse karega array par and atleast 1 conditon true ho gayi to loop ko stop kr dega
     * 
     * continuous check karte jayega jaise hi koi bhi field ki conditoon true hui loop stop ho jayega
     * 
     * 
     * OPTIONAL CHAINING OPERATOR hai 
     * ye operator error aane se rokta hia uski jagah undefined return kr deta hai 
     * for e.g agar koi field exits nhi karti to us case mai undefined return kar dega error nhi 
     * 
     * 
     * dry run : 
     * 1. fullname aya "tarun yadav"?.trim() == ""
     * tarun yadav exists karta hai to trim() ho jayga fir check hoga === " "
     * agar true hua to some wala stop ho jayega and error throw ho jayga
     */


    // ab check karenger user exist karta hai ya na 

    const existingUser = User.findOne({
        $or : [ { username } , { email }]
    })
    if(existingUser){
        throw new ApiError(409 , `User with ${this.email} or ${this.username} already exists.`)
    }

    // now ab images and avatar check karne hai upload hue hai ya nhi local server path

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath= req.files?.coverImage[0]?.path;

})

// const loginUser = requestHandler(async (req, res )=> {
//     res.status(200).json({
//         message : "login user secessfully",
//         name : "Tarun Yadav",
//         success : true,
//     })
// })

// export {registerUser , loginUser};
export {registerUser};