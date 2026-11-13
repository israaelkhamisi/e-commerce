import type { IUser } from "src/interfaces/user.interface";
import type { ApiResponse } from "src/types/api.types";

export async function getMe(): Promise<ApiResponse<IUser>> {
  const res = await fetch("/api/user");
  return res.json();
}
