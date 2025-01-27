import z from "zod";
import { userDTO } from "./userDTO";

export const userCreateDTO = userDTO.pick({
  name: true,
  username: true,
  password: true,
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserCreateDTO extends z.infer<typeof userCreateDTO> {}
