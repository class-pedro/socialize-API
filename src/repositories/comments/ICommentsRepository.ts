import { CommentDTO } from '@/domain';
import { CommentCreateDTO } from '@/domain/comments/commentCreateDTO';
import { CommentUpdateDTO } from '@/domain/comments/commentUpdateDTO';

export interface ICommentsRepository {
  createComment: (newComment: CommentCreateDTO) => Promise<Partial<CommentDTO>>;
  getCommentById: (commentId: string) => Promise<Partial<CommentDTO> | null>;
  updateComment: (
    commentId: string,
    updateComment: CommentUpdateDTO,
  ) => Promise<Partial<CommentDTO>>;
  deleteComment: (commentId: string) => Promise<void>;
}
