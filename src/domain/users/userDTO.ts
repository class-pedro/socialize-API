import z from 'zod';
import { commentDTO } from '../comments';
import { postDTO } from '../posts/postDTO';


export const userDTO = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
    .max(100, { message: 'O nome não pode conter mais do que 100 caracteres.' })
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, {
      message: 'O nome deve conter apenas letras e espaços.',
    }),
  username: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter pelo menos 3 caracteres.' })
    .max(30, { message: 'O nome de usuário deve ter no máximo 30 caracteres.' })
    .regex(/^[a-zA-Z0-9._]+$/, {
      message:
        'O nome de usuário só pode conter letras, números, pontos e underlines.',
    }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    .max(128, { message: 'A senha deve ter no máximo 128 caracteres.' })
    .regex(/(?=.*[a-z])/, {
      message: 'A senha deve conter pelo menos uma letra minúscula.',
    })
    .regex(/(?=.*[A-Z])/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula.',
    })
    .regex(/(?=.*\d)/, { message: 'A senha deve conter pelo menos um número.' })
    .regex(/(?=.*[@$!%*?&])/u, {
      message:
        'A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &).',
    }),
  posts: z.array(postDTO),
  comments: z.array(commentDTO),
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserDTO extends z.infer<typeof userDTO> {}
