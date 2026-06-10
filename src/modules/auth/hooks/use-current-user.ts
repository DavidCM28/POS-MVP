import { useQuery } from "@tanstack/react-query";
import type { AuthUser } from "@/modules/auth/types";

const currentUserMock: AuthUser = {
  id: "user-1",
  name: "Administrador",
  email: "admin@pos.local",
  role: "admin",
};

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "current-user"],
    queryFn: async () => currentUserMock,
  });
}
