import { UserDTO } from './userDTO';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateUserResponse extends Pick<UserDTO, 'id'> {}
