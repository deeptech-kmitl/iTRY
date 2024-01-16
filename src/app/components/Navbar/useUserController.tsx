import { useSession } from "next-auth/react";
import { UserData } from "./navbar.d";

export default function useUserController() {
  const { data: session } = useSession();
  const isLogin = session && session.user
  const userData: UserData = {
    username: session?.user?.name || ""
  }
  return {
    isLogin,
    userData
  }
}