import { RoleUser } from "@/app/api/users/route";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";
import { Notification } from "@/app/utils/ManageEmail/email";
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: RoleUser;
      name: string;
      email: string;
      notifications: Notification[];
      activitiesFollow: ITryActivity[];
    } & DefaultSession
  }

  interface User extends DefaultUser {
    id: string;
    role: RoleUser;
    name: string;
    email: string;
    notifications: Notification[];
    activitiesFollow: ITryActivity[];
    receiveEmail: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: RoleUser;
    name: string;
    email: string;
    notifications: Notification[];
    activitiesFollow: ITryActivity[];
  }
}