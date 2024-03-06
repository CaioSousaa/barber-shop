import { User } from '@prisma/client';

export interface ISendEmailTokenRecoveryPasswordDTO {
  token: string;
  user: User;
}
