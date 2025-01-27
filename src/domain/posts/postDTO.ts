import z from 'zod';
import { commentDTO } from '../comments';

export const postDTO = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'O título deve ter pelo menos 1 caractere'),
  content: z.string().min(1, 'O conteúdo não pode ser vazio.'),
  createdAt: z.date(),
  updatedAt: z.date(),
  authorId: z.string().uuid(),
  comments: z.array(commentDTO).optional(),
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PostDTO extends z.infer<typeof postDTO> {}