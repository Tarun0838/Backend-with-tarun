import express from "express"
import dotenv from 'dotenv'

// configuring the .env file so that port undefined na aaye 

dotenv.config();
const port =  4000;

/** Creating our first server  */

const app = express();

app.get('/', (req , res)=>{
    res.send("server is ready ");
})
app.get('/api/jokes' , (req , res)=>{
    const data = [
        {id : 1,
        title: "fist joke ",
        content : "this is joke 1 ",
        },
        {id : 2,
        title: "second  joke ",
        content : "this is joke 2 ",
        },
        {id : 3,
        title: "third joke ",
        content : "this is joke 3 ",
        },
        {id : 4,
        title: "fourth joke ",
        content : "this is joke 4 ",
        },
    ];
    // res.send("This is your data :");
    res.send(data);
})


app.listen(port, ()=>{
    console.log("Hello Tarun Yadav");
    console.log(`Your site is running on port ${port}`)
})