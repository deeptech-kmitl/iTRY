import { useSession } from "next-auth/react";
import { User } from "next-auth";

export default function useUserController() {
  const { data: session, status, update } = useSession();
  const isLogin = status === "authenticated"
  const userData: User = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    role: session?.user?.role || "",
    id: session?.user?.id || "",
    notifications: session?.user?.notifications || [],
    activitiesFollow: session?.user?.activitiesFollow || [],
    // receiveEmail: session?.user?.receiveEmail || false
  }
  console.log("userData", userData);
  return {
    isLogin,
    userData,
    update,
    session
  }
}