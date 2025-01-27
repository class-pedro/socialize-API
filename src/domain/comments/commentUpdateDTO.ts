import z from 'zod';
import { commentDTO } from './commentDTO';

export const commentUpdateDTO = commentDTO
  .pick({
    content: true,
  })
  .partial()
  .refine((data) => data.content !== undefined, {
    message:
      'O conteúdo do novo comentário deve ser fornecido para atualização.',
  });

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CommentUpdateDTO extends z.infer<typeof commentUpdateDTO> {}
