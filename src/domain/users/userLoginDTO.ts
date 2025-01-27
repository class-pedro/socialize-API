import z from "zod";
import { userDTO } from "./userDTO";

export const userLoginDTO = userDTO.pick({
  username: true,
  password: true,
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserLoginDTO extends z.infer<typeof userLoginDTO> {}
