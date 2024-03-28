import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { useMemo } from "react";

export default function useUserController() {
  const { data: session, status, update } = useSession();
  const isLogin = status === "authenticated"
  const userData: User = useMemo(() => {
    return {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      role: session?.user?.role || "outsider",
      id: session?.user?.id || "",
      notifications: session?.user?.notifications || [],
      activitiesFollow: session?.user?.activitiesFollow || [],
      receiveEmail: session?.user?.receiveEmail || false,
    };
  }, [session]);

  console.log("userData", userData)

  return {
    isLogin,
    userData,
    update,
    session
  }
}