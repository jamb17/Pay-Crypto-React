import { Router } from 'express';
import userController from '../controller/userController.js';
import upload from '../middlewares/upload.js';

const UserRouter = Router();

UserRouter.post('/registration', userController.registration);
UserRouter.post('/completeRegistration', userController.completeRegistration);
UserRouter.post('/login', userController.login);
UserRouter.get('/getUserData', userController.getUserData);
UserRouter.post('/refresh', userController.refresh);
UserRouter.post('/createMerchantAccount', upload.single('file'), userController.createMerchantAccount);

export default UserRouter;  