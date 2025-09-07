import upload from "../middlewares/upload.js";
import userService from "../service/userService.js";

class userController {

    async registration (req, res) {
        try {
            let data = req.body;
            await userService.registration(data.email, data.password);    
            return res.json('succeed');
        } catch(e) {    
            res.status(500).json(e.message);
        }
    }

    async completeRegistration (req, res) {
        try {
            const data = await userService.completeRegistration(req.body.email, req.body.code);
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(data.accessToken);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async login (req, res) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData.accessToken);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getUserData(req, res) {
        try {
            const accessToken = req.headers.authorization;
            const email = req.query.email; 
            const user = await userService.getUserData(accessToken, email);
            return res.json(user)
        } catch (error) {
            console.log(error)
            if (error.message === 'Unauthorized Error') {
                res.status(401).json(error.message)
            } else res.status(500).json(error.message)
        }
    }

    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies;
            const user = await userService.refresh(refreshToken);
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(user.accessToken)
        } catch (error) {
            if (error.message === 'Unauthorized Error') {
                res.status(401).json(error.message)
            } else res.status(500).json(error.message)
        }
    }

    createMerchantAccount(req, res) {
        upload.single('file')(req, res, async (err) => {
            if (err) {
                return res.status(400).json(err.message)
            }
            
            try {
                const { email, name } = req.body;
                const file = req.file;
                const accessToken = req.headers.authorization;
                await userService.createMerchantAccount(
                    email,
                    name,
                    file,
                    accessToken
                );
                return res.sendStatus(201);
            } catch (e) {
                console.error(e);
                return res.status(500).json(e.message);
            }
        });
    }

    createDonateAccount(req, res) {
        upload.single('file')(req, res, async (err) => {
            if (err) {
                return res.status(400).json(err.message)
            };

            try {
                const { email, name } = req.body;
                const file = req.file;
                const accessToken = req.headers.authorization;
                await userService.createDonateAccount(email, name, file, accessToken);
                return res.sendStatus(201)
            } catch (e) {
                console.error(e);
                return res.status(500).json(e.message);
            };
        });
    };

    async changePassword(req, res) {
        try {
            const accessToken = req.headers.authorization;
            const { email, oldPassword, newPassword } = req.body;
            await userService.changePassword(email, oldPassword, newPassword, accessToken);
            return res.sendStatus(200);
        } catch (e) {
            console.error(e)
            if (e.message === 'Unauthorized Error') {
                res.status(401).json(e.message)
            } else res.status(500).json(e.message)
        }
    }

    async changeAvatar (req, res) {
        upload.single('file')(req, res, async (err) => {
            if (err) {
                return res.status(400).json(err.message)
            };

        try {
            const accessToken = req.headers.authorization;
            const { email } = req.body;
            const file = req.file;
            await userService.changeAvatar(email, accessToken, file)
            return res.sendStatus(200);
        } catch (e) {
            console.log(e)
            if (e.message === 'Unauthorized Error') {
                res.status(401).json(e.message)
            } else res.status(500).json(e.message)
        }})
    }

};

export default new userController();