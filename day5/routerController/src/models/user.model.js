import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/* 
ye ban gaya user model mongoose ki help se 
ab banayenge video model 
*/

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            lowercase : true,
            unique : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            lowercase : true,
            unique : true,
            trim :  true
        },
        fullname : {
            type : String,
            required : true,
            trim : true
        }, 
        avatar : {
            type : string, // cloudinary url store krenge 
            required : true,
        },
        coverImage : {
            type : string, // cloudinary url 

        },
        password : {
            type : string,
            required : [true , "password is required "],
        },
        refreshToken : {
            type : string ,
        },
        watchHistory : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Video",
            }
        ]
    },
    {timestamps : true});

/**
 * so ab humen jo humne password field banayi hai usko normal nhi chorna hume usko encrypt karna hai and then store karna hai database mai and jab bhi vo password update ho to usse dubara encrypt karke store karna hai database mai 
 * 
 * so iske liye hum ek library ka use karte hai vo hai bcrypt jo ki password ko hash (encrypt ) karne ke liye use hoti hai 
 */

/**
 * aise nhi phele middle ware or hooks ka use karn hoga
 * hook basically ek middleware hote hai jo jab bhi data par koi event hota hai like save , update create, etc to usse just phele kuch processing karna ho to kar sakte hai 
 * 
 * 1. Mongoose Hooks (Document Middleware)
Mongoose me hooks ko officially "middleware" bhi kehte hain. Ye database operations (save, find, update, delete) ke before/after automatically run hote hain
 */


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    /**
     * ye niche wali line password ko hash karengi jab bhi userSchema mai passowrd filed modified hogi
     * 
     */

    this.password = bcrypt.hash(this.password, 10);
    next();
})

/**
 * ab humne password toh encrypt kar diya but agar humne compare karna ho jo password humne enter kiya hai to correct hai ya nhi toh kaise karenge kyuiki encrypt password to store ho gaya database mai and 
 * 
 * now ab encrypt password and normal password ko compare karna to possible nhi so hum uske liye bcrypt se hi bolenge ki isko compare karke batao 
 */

userSchema.methods.isPasswordCorrect = async function(passowrd) {
  return await bcrypt.compare(passowrd , this.passowrd)
}

/**
 * is bcrypt.compare method se hmm apna normal password and encrypt password ko compare kar lenge 
 */


// ab jwt token se accessToken and refreshToken generate karenge 

userSchema.methods.generateAccessToken = function(){
   return jwt.sign( // sign ka matlab hai digital signature create karna
        {
            _id :  this._id,
            username : this.username,
            fullname :  this.fullname,
            email : this.email,
        },
        
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
        {
            _id :  this._id,
            
        },
        
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// generating access token and refresh token

// userSchema.methods.generateAccessToken = function(){
//     return jwt.sign(
//         {   id : this.id,
//             username : this.username,
//             fullname : this.fullname,
//             email : this.email,


//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
//         }

//     )
// }




export const  User = mongoose.model("User", userSchema);