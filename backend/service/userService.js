import User from "../models/User.js";
import bcrypt from 'bcrypt';
import tokenService from "./tokenService.js";

class userService {
    async registration (email, pass) {
        const userExists = await User.findOne({email: email});
        if (userExists) {
            throw new Error('Account with this email is already exists');
        };
        const hashPass = await bcrypt.hash(pass, 3);
        const user = await User.create({email, pass: hashPass});
        const tokens = tokenService.generateTokens({email: user.email, id: user._id});
        await tokenService.saveToken(user._id, tokens.refreshToken);
        return {...tokens};
    };
};

export default new userService();