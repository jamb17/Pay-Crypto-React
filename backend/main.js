import express from "express";
import mongoose from "mongoose";
import UserRouter from "./userRouter.js";
import cors from 'cors';

const app = express();
const PORT = 5000;
const DB_URL = 'mongodb+srv://dimanesterov11:yvY4UQePZHgxKGaE@cluster0.dy4xz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/user', UserRouter);

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, console.log('Succeed'));
    } catch(e) {
        console.log(e);
    }
}

startApp();