import { Schema, model } from "mongoose";

const Merchant = new Schema({
    name: {type: String, required: true},
    avatar: {type: Buffer, required: false},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

export default model('Merchant', Merchant);