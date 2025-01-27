import z from 'zod';
import { postDTO } from './postDTO';

export const postCreateDTO = postDTO.pick({
  title: true,
  content: true,
  authorId: true,
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PostCreateDTO extends z.infer<typeof postCreateDTO> {}
