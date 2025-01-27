import { PostService } from '../../services/posts/PostService';
import { prisma } from '../../libs/prisma/index';
import { PostsController } from './postsController';
import { PostRepository } from '../../repositories/posts/PostRepository';
import { UserRepository } from '../../repositories';

const postRepository = new PostRepository(prisma);
const userRepository = new UserRepository(prisma);
const postService = new PostService(postRepository, userRepository);
export const postController = new PostsController(postService);
