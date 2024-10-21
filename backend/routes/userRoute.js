import Router from 'express';
import userController from '../controller/userController.js';

const UserRouter = new Router();

UserRouter.post('/registration', userController.registration);
UserRouter.post('/completeRegistration', userController.completeRegistration);
UserRouter.post('/login', userController.login);

export default UserRouter;