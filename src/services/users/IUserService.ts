import { UserLoginDTO } from '../../domain/users/userLoginDTO';
import { CreateUserResponse } from '@/domain/users/createUserResponse';
import { UserCreateDTO } from '@/domain/users/userCreateDTO';

export interface IUserService {
  createUser: (req: UserCreateDTO) => Promise<Partial<CreateUserResponse>>;
  login: (req:UserLoginDTO) => Promise<string>;
}
