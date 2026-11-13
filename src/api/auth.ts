import type { IUser } from "src/interfaces/user.interface";
import type { ApiResponse } from "src/types/api.types";

async function post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const res = await fetch(`/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export const login = (body: { email: string; password: string }) =>
  post<IUser>("login", body);

export const register = (body: {
  name: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
}) => post<IUser>("register", body);

export const forgotPassword = (body: { email: string }) =>
  post<null>("forgot-password", body);

export const verifyResetCode = (body: { resetCode: string }) =>
  post<null>("verify-code", body);

export const resetPassword = (body: { email: string; newPassword: string }) =>
  post<null>("reset-password", body);
