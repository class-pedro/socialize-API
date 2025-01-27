import { prisma } from '../../libs';
import {
  CommentsRepository,
  PostRepository,
  UserRepository,
} from '../../repositories';
import { CommentService } from '../../services';
import { CommentsController } from './commentsController';

const commentsRepository = new CommentsRepository(prisma);
const userRepository = new UserRepository(prisma);
const postsRepository = new PostRepository(prisma);
const commentsService = new CommentService(
  commentsRepository,
  userRepository,
  postsRepository,
);
export const commentsController = new CommentsController(commentsService);
