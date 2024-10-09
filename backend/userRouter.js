import Router from 'express';
import userService from './service/userService.js';

const UserRouter = new Router();

UserRouter.post('/create', async (req, res) => {
    try {
        let data = req.body;
        const userData = await userService.registration(data.email, data.pass);    
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.json(userData.accessToken);
    } catch(e) {    
        console.log(e);
        res.status(500).json(e);
    }
})

export default UserRouter;