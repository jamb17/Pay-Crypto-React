import express from 'express';
import cors from 'cors';
import mongodb from 'mongodb';
import {
    createTransport
} from 'nodemailer';
let app = express();
let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017');
app.use(cors());

const middle = express.urlencoded({
    extended: false,
    limit: 10000,
    parameterLimit: 3,
});

function generateVerificationCode() {
    var minm = 200000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "dimanesterov.lul@gmail.com",
        pass: "5NHw1cKvOdsBEW0C",
    },
});

app.post('/', middle, (req, res) => {

    async function run() {
        try {
            const database = mongoClient.db('testDB');
            const cl = database.collection('testCollection');
            let data = req.body;
            const userExists = await cl.findOne({
                'email': data.email
            });
            if (userExists) {
                res.send('email exists')
            } else {
                if (data.passRepeat) delete data.passRepeat;
                let verificationCode = generateVerificationCode();
                data.verificationCode = verificationCode
                data.expirationTime = new Date(Date.now() + 5 * 60 * 1000);
                await cl.insertOne(data);
                transporter.sendMail({
                    from: 'dimanesterov.lul@gmail.com',
                    to: data.email,
                    subject: 'Pay Crypto verification code',
                    text: `Your code: ${verificationCode}. Expires in 5 mins :)`
                }, (err, info) => {
                    console.log(info.envelope);
                    console.log(info.messageId);
                });
                res.send(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    run();

});

app.post('/checkVerification', middle, async (req, res) => {
    try {
        const database = mongoClient.db('testDB');
        const cl = database.collection('testCollection');
        let data = req.body;
        const user = await cl.findOne({
            'email': data.email
        });

        if (user && user.verificationCode === parseInt(data.code)) {
            const currentTime = new Date();
            if (user.expirationTime >= currentTime) {
                res.send(true);
            } else {
                cl.remove({
                    'email': data.email
                });
                res.send('Verification code has expired');
            }
        } else {
            res.send('Invalid verification code');
        }
    } catch (err) {
        console.log(err);
    }

});

app.listen(7000);