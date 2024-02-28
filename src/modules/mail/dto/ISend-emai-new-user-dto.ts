import { User } from '@prisma/client';

export interface ISendEmailNewUserDTO {
  user: User;
}
