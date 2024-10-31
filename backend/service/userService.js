import User from "../models/User.js";
import bcrypt from 'bcrypt';
import tokenService from "./tokenService.js";
import mailService from "./mailService.js";

class userService {

    convertEmail(email) {
        let localPart = email.split('@')[0];
        localPart = localPart.replace(/\./g, '');
        return localPart;
    }

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
            const user = await User.create({email, nickname: this.convertEmail(email), password: hashPass, verificationCode: code, codeExpirationTime: expirationTime});
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

    async getUserData(accessToken, email) {
        const validToken = tokenService.validateAccessToken(accessToken);
        if (!accessToken || !validToken || !email) {
            throw new Error('Unauthorized Error');
        };
        const user = await User.findOne({email: email});
        return user;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('Unauthorized Error');
        };
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        console.log(!userData, !tokenFromDb);
        if (!userData || !tokenFromDb) {
            throw new Error('Unauthorized Error');
        };
        const user = await User.findById(userData.id);
        const tokens = tokenService.generateTokens({email: user.email, id: user._id});
        await tokenService.saveToken(user._id, tokens.refreshToken);
        return {user, ...tokens};
    }   
 
};

export default new userService();