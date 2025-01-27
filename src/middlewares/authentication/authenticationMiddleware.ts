import { IUserRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export class AuthenticationMiddleware {
  constructor(private readonly usersRepository: IUserRepository) {}

  handle = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        res.status(401).send('Não autorizado');
        return;
      }

      const token = authorization.split(' ')[1];

      const { username } = jwt.verify(
        token,
        process.env.JWT_PASS ?? '',
      ) as JwtPayload;

      const user = await this.usersRepository.getUserByUsername(username);

      if (!user) {
        res.status(401).send('Não autorizado');
        return;
      }
      
      req.body.username = user.username;

      next();
    } catch (error) {
      next(error);
    }
  };
}
