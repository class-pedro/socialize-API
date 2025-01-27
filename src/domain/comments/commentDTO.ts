import z from 'zod';

export const commentDTO = z.object({
  id: z.string().uuid(),
  content: z.string().min(1, 'O conteúdo do comentário não pode ser vazio.'),
  createdAt: z.date(),
  updatedAt: z.date(),
  postId: z.string().uuid(),
  authorId: z.string().uuid(),
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CommentDTO extends z.infer<typeof commentDTO> {}