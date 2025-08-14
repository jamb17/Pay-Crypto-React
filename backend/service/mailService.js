import { createTransport } from "nodemailer";
import User from "../models/User.js";

class mailService {

    constructor() {
        this.transporter = createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
                user: "dimanesterov.lul@gmail.com",
                pass: "5NHw1cKvOdsBEW0C",
            },
        })
    }

    generateVerificationCode () {
        var minm = 200000;
        var maxm = 999999;
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    }

    sendVerificationCode(email){
        const verificationCode = this.generateVerificationCode();
        try {
            this.transporter.sendMail({
                from: 'dimanesterov.lul@gmail.com',
                to: email,
                subject: 'Pay Crypto verification code',
                text: `Your code: ${verificationCode}. Expires in 5 mins :)`
            },(err, info) => {
                throw new Error(err);
            });
            return verificationCode;
        } catch(e) {
            console.log(e);
            return false;
        }
        
    }

    async verifyCode (email, code) {
        const user = await User.findOne({email: email});
        if (user && user.verificationCode === parseInt(code)) {
            const currentTime = new Date();
            if (user.codeExpirationTime && user.codeExpirationTime >= currentTime) {
                await User.updateOne(
                    { email: email }, 
                    { $unset: { verificationCode: "", codeExpirationTime: "" } }
                );
                return user;
            } else throw new Error('Verification code has expired'); 
        } else throw new Error('Invalid verification code'); 
    }

}

export default new mailService();