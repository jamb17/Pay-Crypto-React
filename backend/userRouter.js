import Router from 'express';
import User from './User.js';

const UserRouter = new Router();

UserRouter.post('/create', async (req, res) => {
    try {
        let data = req.body;
        const userExists = await User.findOne({email: data.email});
        if (userExists) {
            return res.status(409).json('Account with this email is already exists')
        }
        await User.create(req.body)
        res.status(200).json('Succeed');    
    } catch(e) {    
        console.log(e);
        res.status(500).json(e);
    }
})

export default UserRouter;