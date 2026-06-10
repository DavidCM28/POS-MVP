export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "cashier" | "manager";
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  expiresAt: string;
};
