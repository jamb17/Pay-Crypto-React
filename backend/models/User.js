import {Schema, model} from "mongoose";

const User = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    nickname: {type: String, required: false},
    verificationCode: {type: Number, required: false},
    codeExpirationTime: {type: Date, required: false},
    avatarURL: {type: String, required: false},
    avatarUUID: {type: String, required: false}
});

export default model('User', User);