import mongoose from "mongoose";

const userScehema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            lowercase : true,
            unique: true
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true
        },
        phoneno: {
            type : Number,
            required : true,
            
        }
        
    },
     {timestamps : true});

export const User = mongoose.model("User", userScehema);
