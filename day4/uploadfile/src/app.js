import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// now we are trying to use middlewares

app.use(cors({
    origin : process.env.CROSS_ORIGIN,
    credentials: true
}))

// ye basically ek middleware hai jo request ka response karen se phele checing karte hai ki like : 

/* express.json() ye check karta hai ki request mai jo json file ayi hai vo jyada badi nhi honi chaiye nhi to server crash ho jayega isliye limit set kardi limit : "20kb" */

app.use(express.json({limit: "20kb"}))

/* express.urlencoded() ye bhi ek middleware hai jo url ko handle karta hai and usko fir parse kr deta haiobject form mai and fir uski limit bhi set kardi hai  */
app.use(express.urlencoded({extended: true , limit: "20kb"}))

/* ye bhi ek middle ware hai jo static file like html css , js  , images ko browser ko serve karta hai public folder se */

app.use(express.static("public"))

/* cookie parser ka use sirf itna hai ki user ke browser ki cookies ko serectly store karna hai secretly unpe crud operation perform karna server ke through 
sirf servre ki unko dekh and modify kr sakta hai or koi nhi  */

app.use(cookieParser());
export default app;
