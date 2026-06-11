import app from "./app.js";
import dbConnect from "./db/index.js";



dbConnect()
.then((req , res)=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running on Port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(`server Connection is failed ${error}`);
})
