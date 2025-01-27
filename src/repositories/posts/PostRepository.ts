import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/binary';
import { PostCreateDTO } from '@/domain/posts/postCreateDTO';
import { IPostRepository } from './IPostRepository';
import { PostUpdateDTO } from '@/domain/posts/postUpdateDTO';

export class PostRepository implements IPostRepository {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createPost(newPost: PostCreateDTO) {
    return await this.prisma.post.create({ data: newPost });
  }

  async listPosts() {
    return await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            username: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                name: true
              }
            }
          }
        }
      },
    });
  }

  async getPostById(postId: string) {
    return this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  }

  async updatePost(postId: string, updatePost: PostUpdateDTO) {
    const { title, content } = updatePost;
    return await this.prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
      },
    });
  }

  async deletePost(postId: string) {
    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
