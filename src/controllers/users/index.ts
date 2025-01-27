import { UsersController } from './usersController';
import { UserRepository } from '../../repositories/users/UserRepository';
import { prisma } from '../../libs/prisma/index';
import { UserServices } from '../../services/users/UserServices';

const userRepository = new UserRepository(prisma);
const userService = new UserServices(userRepository);
export const userController = new UsersController(userService);
