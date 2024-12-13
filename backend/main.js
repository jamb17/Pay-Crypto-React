import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import UserRouter from "./routes/userRoute.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5174', 
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/user', UserRouter);

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, console.log('Succeed - ' + PORT));
    } catch(e) {
        console.log(e);
    }
}

startApp();