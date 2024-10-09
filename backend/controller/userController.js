import userService from "../service/userService.js";

class userController {

    async registration (req, res) {
        try {
            let data = req.body;
            await userService.registration(data.email, data.pass);    
            return res.json('succeed');
        } catch(e) {    
            console.log(e);
            res.status(500).json(e);
        }
    }

    async completeRegistration (req, res) {
        try {
            const data = await userService.completeRegistration(req.body.email, req.body.code);
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(data.accessToken);
        } catch (e) {
            console.log(e.message);
            res.status(500).json(e.message);
        }
    }

};

export default new userController();