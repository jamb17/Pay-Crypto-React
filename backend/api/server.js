import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import UserRouter from "../routes/userRoute.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

const corsOptions = {
    origin: 'https://paycrypto-zeta.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use('/user', UserRouter);

export default async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        try {
            await mongoose.connect(process.env.DB_URL)
        } catch (error) {
            console.error('MongoDB connection error: ', error);
            return res.status(500).json('DB connection failed');
        }
    }
    return app(req, res)
}