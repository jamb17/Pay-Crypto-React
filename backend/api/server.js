import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import UserRouter from "../routes/userRoute.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

const corsOptions = {
    origin: 'https://paycrypto-zeta.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(express.json());
app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use('/user', UserRouter);

async function startApp () {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.DB_URL);
        }
        app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
    } catch (error) {
        console.error('Server error: ', error);
    }
}

startApp()

export default app