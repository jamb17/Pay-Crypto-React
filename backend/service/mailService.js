import { createTransport } from "nodemailer";

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

    sendVerificationCode(){

    }
}

export default new mailService();