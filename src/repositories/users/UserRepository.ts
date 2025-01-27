import { Prisma, PrismaClient } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import { DefaultArgs } from '@prisma/client/runtime/binary';
import { UserCreateDTO } from '@/domain/users/userCreateDTO';

export class UserRepository implements IUserRepository {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createUser(createUser: UserCreateDTO) {
    return this.prisma.users.create({ data: createUser });
  }

  async getUserByUsername(username: string) {
    return this.prisma.users.findUnique({
      where: {
        username,
      },
      include: {
        posts: true,
        comments: true
      }
    });
  }
}
