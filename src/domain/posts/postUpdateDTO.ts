import z from 'zod';
import { postDTO } from './postDTO';

export const postUpdateDTO = postDTO
  .pick({
    title: true,
    content: true,
  })
  .partial()
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    message: 'Pelo menos um campo deve ser fornecido para atualização.',
  });

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PostUpdateDTO extends z.infer<typeof postUpdateDTO> {}
