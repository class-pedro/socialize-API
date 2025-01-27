import { userController } from '../../controllers/users';
import { Router } from 'express';

const usersRoutes = Router();

usersRoutes.post('/user', userController.createUser);
usersRoutes.post('/login', userController.login);

export { usersRoutes };
