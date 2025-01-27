import { userLoginDTO } from '../../domain/users/userLoginDTO';
import { userCreateDTO } from '../../domain/users/userCreateDTO';
import { IUserService } from '@/services/users/IUserService';
import { NextFunction, Request, Response } from 'express';

export class UsersController {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCreateForm = userCreateDTO.parse(req.body);

      const response = await this.userService.createUser(userCreateForm);

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userLoginForm = userLoginDTO.parse(req.body);

      const response = await this.userService.login(userLoginForm);

      res.status(200).json({ token: response });
    } catch (error) {
      next(error);
    }
  };
}
