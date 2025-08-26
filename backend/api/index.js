import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import UserRouter from "../routes/userRoute.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

const corsOptions = {
    origin: 'https://paycrypto-zeta.vercel.app/',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use('/user', UserRouter);

app.get('/', (req, res) => {
    res.send("Works");
})

export default async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    console.log('🗄️  Connecting to MongoDB…');
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log('✅ MongoDB connected');
    } catch (err) {
      console.error('❌ MongoDB connection error:', err);
      return res.status(500).send('DB connection failed');
    }
  }

  return app(req, res);
}