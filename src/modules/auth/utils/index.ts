import type { AuthUser } from "@/modules/auth/types";

export function canManageCatalog(user: AuthUser) {
  return user.role === "admin" || user.role === "manager";
}
