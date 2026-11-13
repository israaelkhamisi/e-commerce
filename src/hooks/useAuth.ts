"use client";

import { useState } from "react";
import { login as loginRequest, register as registerRequest } from "src/api/auth";
import type { IUser } from "src/interfaces/user.interface";

type LoginBody = Parameters<typeof loginRequest>[0];
type RegisterBody = Parameters<typeof registerRequest>[0];

// Signed-in user state. Local only for now: each TODO marks where the API work goes.
// To read the user in TopBar and the pages, move this into a context provider.
export function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: make sure /api/auth/login exists and saves the token (cookie)
  async function login(body: LoginBody) {
    setLoading(true);
    setError(null);
    const res = await loginRequest(body);
    if (res.success) setUser(res.data);
    else setError(res.error);
    setLoading(false);
    return res.success;
  }

  // TODO: make sure /api/auth/register exists
  async function register(body: RegisterBody) {
    setLoading(true);
    setError(null);
    const res = await registerRequest(body);
    if (!res.success) setError(res.error);
    setLoading(false);
    return res.success;
  }

  // TODO: clear the token (cookie) on the server too
  function logout() {
    setUser(null);
  }

  return { user, isLoggedIn: user !== null, loading, error, login, register, logout };
}
