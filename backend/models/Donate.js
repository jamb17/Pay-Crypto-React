import { Schema, model } from "mongoose";

const Donate = new Schema({
    name: {type: String, required: true},
    avatar: {type: Buffer, required: false},
    avatarContentType: { type: String, required: false },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

export default model('Donate', Donate);