import { UserDTO } from '@/domain';
import { UserCreateDTO } from '@/domain/users/userCreateDTO';

export interface IUserRepository {
  createUser: (createUser: UserCreateDTO) => Promise<Partial<UserDTO>>;
  getUserByUsername: (username: string) => Promise<UserDTO | null>;
}
