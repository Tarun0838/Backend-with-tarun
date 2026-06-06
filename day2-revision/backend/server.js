import express from "express"
import dotenv from 'dotenv';


const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.get('/' , (req , res)=>{
    res.send("server is Ready to serve ");
})
app.get('/api/youtube',  (req, res)=>{
    res.send('youtube is here ');
})

const data = [
    {id : 1 , "name" : "Tarun Yadav" , skill : ['python ', 'c++', "js"]},
    {id : 2 , "name" : "Vishnu goyal" , skill : ['rust ', 'c++', "js"]},
    {id : 3 , "name" : "Tushar Gautam" , skill : ['react ', 'java', "js"]},
    {id : 4 , "name" : "Priyanshu Sharma" , skill : ['java ', 'c++', "html"]},
    {id : 5 , "name" : "Karan Saxena" , skill : ['typeScript ', 'python', "js"]},
    {id : 6 , "name" : "Yash kumar" , skill : ['python ', 'c++', "js"]},
]

app.get('/api/userdata', (req , res)=>{
    res.send(data);
})

app.listen(port , ()=>{
    console.log(`Server is listening on port ${port}`)
})