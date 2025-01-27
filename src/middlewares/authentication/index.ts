import { prisma } from '../../libs';
import { UserRepository } from '../../repositories';
import { AuthenticationMiddleware } from './authenticationMiddleware';

const usersRepository = new UserRepository(prisma);

export const authenticationMiddleware = new AuthenticationMiddleware(
  usersRepository,
);
