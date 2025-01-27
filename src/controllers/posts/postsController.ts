import { IPostService } from '../../services/posts/IPostService';
import { postCreateDTO } from '../../domain/posts/postCreateDTO';
import { NextFunction, Request, Response } from 'express';
import { postUpdateDTO } from '../../domain/posts/postUpdateDTO';

export class PostsController {
  postService: IPostService;

  constructor(postService: IPostService) {
    this.postService = postService;
  }

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postCreateForm = postCreateDTO.parse(req.body);

      const response = await this.postService.createPost(postCreateForm);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };

  listPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.postService.listPosts();
      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { username, ...postUpdatePayload } = req.body;

      const postUpdateForm = postUpdateDTO.parse(postUpdatePayload);

      const response = await this.postService.updatePost(id, postUpdateForm, username);

      console.log(response);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { username } = req.body;

      await this.postService.deletePost(id, username);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
