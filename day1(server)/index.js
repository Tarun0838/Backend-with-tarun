const express = require("express");
const app = express();

const port = 3000;

// now ab get request karenge 
app.get('/' , (req , res)=>{
    res.send("hello tarun This is home page ");
})

app.get('/tarun.com',(req , res)=>{
    res.send("hello Tarun this is tarun.com page ");
})

app.get('/tarunMotars', (req , res)=>{
    res.send("<h1> hello Tarun Brother </h1>")
})


app.listen(port , ()=>{
    console.log("hello Tarun Yadav ")
    console.log("Apki site continure listen ho rah hai ")
    console.log(`index.js is listening on port ${port}`);
})