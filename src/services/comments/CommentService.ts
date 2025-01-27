import {
  ICommentsRepository,
  IPostRepository,
  IUserRepository,
} from '@/repositories';
import { ICommentService } from './ICommentService';
import { CommentCreateDTO } from '@/domain/comments/commentCreateDTO';
import { CommentUpdateDTO } from '@/domain/comments/commentUpdateDTO';
import { CommentDTO, UserDTO } from '@/domain';

export class CommentService implements ICommentService {
  constructor(
    readonly commentsRepository: ICommentsRepository,
    readonly usersRepository: IUserRepository,
    readonly postsRepository: IPostRepository,
  ) {}

  async createComment(newComment: CommentCreateDTO) {
    const { postId } = newComment;

    const post = await this.postsRepository.getPostById(postId);

    if (!post) {
      throw new Error("O post em que você tentou comentar não está mais disponível.")
    }

    return await this.commentsRepository.createComment(newComment);
  }

  async getCommentById(commentId: string) {
    return await this.commentsRepository.getCommentById(commentId);
  }

  async canContinue(commentId: string, username: string) {
    const comment = (await this.getCommentById(
      commentId,
    )) as Partial<CommentDTO>;
    const { id: requesterId } = (await this.usersRepository.getUserByUsername(
      username,
    )) as Partial<UserDTO>;

    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }

    if (comment.authorId !== requesterId) {
      throw new Error('Você não pode alterar um comentário que não é seu.');
    }
  }

  async updateComment(
    commentId: string,
    updateComment: CommentUpdateDTO,
    username: string,
  ) {
    await this.canContinue(commentId, username);
    return await this.commentsRepository.updateComment(
      commentId,
      updateComment,
    );
  }

  async deleteComment(commentId: string, username: string) {
    await this.canContinue(commentId, username);
    await this.commentsRepository.deleteComment(commentId);
  }
}
