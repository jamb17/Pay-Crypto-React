import User from "../models/User.js";
import bcrypt from 'bcrypt';
import tokenService from "./tokenService.js";
import mailService from "./mailService.js";

class userService {
    async registration (email, password) {
        const userExists = await User.findOne({email: email});
        if (userExists) {
            throw new Error('Account with this email is already exists');
        };
        const hashPass = await bcrypt.hash(password, 3);
        const code = mailService.sendVerificationCode(email);
        // const hashCode = bcrypt.hash(code, 3);
        const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
        if (code) {
            const user = await User.create({email, password: hashPass, verificationCode: code, codeExpirationTime: expirationTime});
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

    async login (email, password) {
        try {
            const user = await User.findOne({email: email});
            if (!user) {
                throw new Error('No user with this e-mail address was found');
            } 
            const passEquals = await bcrypt.compare(password, user.password);
            if (!passEquals) {
                throw new Error('Wrong password')
            }
            const tokens = tokenService.generateTokens({email: user.email, id: user._id});
            await tokenService.saveToken(user._id, tokens.refreshToken);
            return {user, ...tokens}
        } catch (err) {
            throw err;
        }
    }
 
};

export default new userService();