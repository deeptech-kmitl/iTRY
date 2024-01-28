import { useSession } from "next-auth/react";
import { User } from "next-auth";

export default function useUserController() {
  const { data: session } = useSession();
  const isLogin = session && session.user
  const userData: User = {
    name: session?.user?.name || "",
    role: "admin",
    id: "1"
  }
  return {
    isLogin,
    userData
  }
}