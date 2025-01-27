import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/binary';
import { ICommentsRepository } from './ICommentsRepository';
import { CommentCreateDTO } from '@/domain/comments/commentCreateDTO';
import { CommentUpdateDTO } from '@/domain/comments/commentUpdateDTO';

export class CommentsRepository implements ICommentsRepository {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createComment(newComment: CommentCreateDTO) {
    const { authorId, postId, content } = newComment;

    return await this.prisma.comment.create({
      data: {
        authorId,
        postId,
        content,
      },
    });
  }

  async getCommentById(commentId: string) {
    return this.prisma.post.findUnique({
      where: {
        id: commentId,
      },
    });
  }

  async updateComment(commentId: string, updateComment: CommentUpdateDTO) {
    const { content } = updateComment;

    return await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
      },
    });
  }

  async deleteComment(commentId: string) {
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
