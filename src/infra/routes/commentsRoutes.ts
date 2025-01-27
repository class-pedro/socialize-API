import { commentsController } from '../../controllers/comments'
import { Router } from 'express';

const commentsRoutes = Router();

commentsRoutes.post('/new-comment', commentsController.createComment);
commentsRoutes.put('/comment/:id', commentsController.updateComment);
commentsRoutes.delete('/comment/:id', commentsController.deleteComment);

export { commentsRoutes };
