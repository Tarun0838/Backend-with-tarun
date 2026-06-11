import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
// here we connect our data base 

async function connectDB(){

    try {
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`DATABASE IS CONNECTED SUCESSFULLY || HOST : ${connectionInstance.connection.host}`);
        
       
    } catch (error) {
        console.log("Database connection failed" , error);
        process.exit(1);
    }
}

export default connectDB;