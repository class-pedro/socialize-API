import { authenticationMiddleware } from '../../middlewares/authentication';
import { postController } from '../../controllers/posts';
import { Router } from 'express';

const postsRoutes = Router();

postsRoutes.use(authenticationMiddleware.handle);
postsRoutes.post('/new-post', postController.createPost);
postsRoutes.get('/posts', postController.listPosts);
postsRoutes.put('/post/:id', postController.updatePost);
postsRoutes.delete('/post/:id', postController.deletePost);

export { postsRoutes };
