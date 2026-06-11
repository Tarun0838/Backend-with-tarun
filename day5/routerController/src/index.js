import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from 'dotenv';
import app from './app.js'

dotenv.config({
    path: "./env",
})

// yah jo connectDB() method hai ye ek Asynchornous method hai jo db/index.js mai bna hua hai so we know that ki jo Ashnchornous function ya code hote hai vo ek promise return karte hai so ab iss connectDB() method hai par ispar .then() and .catch() method use kar sakte hai 

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`server is running on port : ${process.env.PORT}`)

    }) 

    app.on("errror" , (error)=>{
        console.log("Error : " , error );
        throw error;
    })
}).catch((error)=>{
    console.log("Server connecting mai error hai");
})

