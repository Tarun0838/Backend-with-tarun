import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config({
    path : "./env",
})

const app = express();

app.use(cors({
    orgin : process.env.CROSS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit : "20kb"}))
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(cookieParser());

// import route
import userRouter from './routes/user.route.js';
app.use("/api/v1/user", userRouter);

export default app;