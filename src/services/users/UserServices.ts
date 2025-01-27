import { UserCreateDTO } from '@/domain/users/userCreateDTO';
import { IUserService } from './IUserService';
import { IUserRepository } from '@/repositories/users/IUserRepository';
import { UserLoginDTO } from '../../domain/users/userLoginDTO';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserServices implements IUserService {
  constructor(readonly usersRepository: IUserRepository) {}

  async createUser(createUser: UserCreateDTO) {
    const { password } = createUser;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUserData = { ...createUser, password: hashPassword };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password: newUserPassword, ...newUser} = await this.usersRepository.createUser(newUserData);

    return newUser;
  }

  async login(loginUser: UserLoginDTO) {
    const { username, password } = loginUser;

    const user = await this.usersRepository.getUserByUsername(username);

    if (!user) {
      throw new Error('Usuário ou senha inválidos.');
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new Error('Usuário ou senha inválidos.');
    }

    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_PASS!, {
      expiresIn: '1h',
    });

    return token;
  }
}
