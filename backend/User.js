import mongoose from "mongoose";

const User = new mongoose.Schema({
    email: {type: String, required: true},
    pass: {type: String, required: true},
    nickname: {type: String, required: false},
});

export default mongoose.model('User', User);