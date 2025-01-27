import { CommentDTO } from '@/domain';
import { CommentCreateDTO } from '@/domain/comments/commentCreateDTO';
import { CommentUpdateDTO } from '@/domain/comments/commentUpdateDTO';

export interface ICommentService {
  createComment: (newComment: CommentCreateDTO) => Promise<Partial<CommentDTO>>;
  getCommentById: (commentId: string) => Promise<Partial<CommentDTO> | null>;
  canContinue: (commentId: string, username: string) => Promise<void>;
  updateComment: (
    commentId: string,
    updateComment: CommentUpdateDTO,
    username: string,
  ) => Promise<Partial<CommentDTO>>;
  deleteComment: (commentId: string, username: string) => Promise<void>;
}
