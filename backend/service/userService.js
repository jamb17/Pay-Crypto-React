import User from "../models/User.js";
import bcrypt from 'bcrypt';
import tokenService from "./tokenService.js";
import mailService from "./mailService.js";

class userService {
    async registration (email, pass) {
        const userExists = await User.findOne({email: email});
        if (userExists) {
            throw new Error('Account with this email is already exists');
        };
        const hashPass = await bcrypt.hash(pass, 3);
        const code = mailService.sendVerificationCode(email);
        // const hashCode = bcrypt.hash(code, 3);
        const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
        if (code) {
            const user = await User.create({email, pass: hashPass, verificationCode: code, codeExpirationTime: expirationTime});
            return user;
        } else throw new Error('Something went wrong while sending email');

    };

    async completeRegistration (email, code) {
        try {
            const verifiedUser = await mailService.verifyCode(email, code);
            const tokens = tokenService.generateTokens({email: verifiedUser.email, id: verifiedUser._id});
            await tokenService.saveToken(verifiedUser._id, tokens.refreshToken);
            return {verifiedUser, ...tokens};
        } catch(err) {
            throw err;
        }
    }
 
};

export default new userService();