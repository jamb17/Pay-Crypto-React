import Router from 'express';
import userService from '../service/userService.js';
import userController from '../controller/userController.js';

const UserRouter = new Router();

UserRouter.post('/registration', userController.registration);
UserRouter.post('/completeRegistration', userController.completeRegistration);

export default UserRouter;