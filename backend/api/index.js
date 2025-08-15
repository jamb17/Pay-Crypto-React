import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import UserRouter from "../routes/userRoute.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
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

app.get('/', (req, res) => {
    res.send("Works");
})

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(process.env.PORT, console.log('Succeed - ' + process.env.PORT));
    } catch(e) {
        console.log(e);
    }
}

startApp();