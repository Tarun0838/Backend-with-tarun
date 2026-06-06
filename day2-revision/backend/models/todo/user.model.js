import mongoose, { Types }  from "mongoose";

const userScehema = new mongoose.Schema(
    {
        userName : {
            type : String,
            required : true,
            lowercase : true,
            unique : true
        },

        email : {
            type : string ,
            unique : true,
            lowercase : true,
            required : true
        },
        password : {
            type : string , 
            required : true
        }

},{timestamps : true});
export const User = mongoose.model("User", userScehema);