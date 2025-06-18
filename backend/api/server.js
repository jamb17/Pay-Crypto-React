import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import UserRouter from "../routes/userRoute.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ServerlessHttp from 'serverless-http';

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
app.options('*', corsOptions);
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use('/user', UserRouter);

const handler = ServerlessHttp(app)

export default async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
    return handler(req, res)
}