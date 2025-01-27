import { commentCreateDTO } from '../../domain/comments/commentCreateDTO';
import { commentUpdateDTO } from '../../domain/comments/commentUpdateDTO';
import { ICommentService } from '@/services';
import { NextFunction, Request, Response } from 'express';

export class CommentsController {
  commentsService: ICommentService;

  constructor(commentsService: ICommentService) {
    this.commentsService = commentsService;
  }

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentCreateForm = commentCreateDTO.parse(req.body);

      const response =
        await this.commentsService.createComment(commentCreateForm);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };

  updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { username, ...commentUpdatePayload } = req.body;

      const commentUpdateForm = commentUpdateDTO.parse(commentUpdatePayload);

      const response = await this.commentsService.updateComment(
        id,
        commentUpdateForm,
        username,
      );

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { username } = req.body;

      await this.commentsService.deleteComment(id, username);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
