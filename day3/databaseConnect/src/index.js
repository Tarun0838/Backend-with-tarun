import mongoose from 'mongoose';
import connectDB from './db/index.js';
// require("dotenv").config({path: "./env"});
import dotenv from 'dotenv'

dotenv.config({
    path: "./env"
})


// import { DB_NAME } from './constants';
// import express from 'express';
// const app = exress();



connectDB();







/*
async function connectDB (){
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Database error : ", error);
            throw error ;
            
        })

        app.listen(process.env.PORT , ()=>{
            console.log(`Site is listening on PORT : ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("Error : ", error);
        throw error;
        
    }
}

*/