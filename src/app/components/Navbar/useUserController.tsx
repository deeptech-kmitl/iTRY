import { useSession } from "next-auth/react";
import { User } from "next-auth";

export default function useUserController() {
  const { data: session, status } = useSession();
  const isLogin = status === "authenticated"
  const userData: User = {
    name: session?.user?.name || "",
    role: session?.user?.role || "",
    id: session?.user?.id || ""
  }
  return {
    isLogin,
    userData
  }
}