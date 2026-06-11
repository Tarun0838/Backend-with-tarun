import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const dbConnect = async ()=> {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log("MONGODB IS CONNECTED SUCESSFULLY");
       console.log("url: ", connectionInstance.connection.host);

    } catch (error) {
        console.log("Database Connection failed : ", error);
        process.exit(1);
        
    }
}

export default dbConnect;