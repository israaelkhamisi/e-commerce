import "next-auth";
import "next-auth/jwt";

interface UserData {
  name: string;
  email: string;
  role: string;
}

declare module "next-auth" {
  interface User {
    token: string;
    user: UserData;
  }
  interface Session {
    user: UserData;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    tokenjwt: string;
    user: UserData;
  }
}