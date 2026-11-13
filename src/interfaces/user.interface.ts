import type { UserRole } from "src/types/user.types";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
