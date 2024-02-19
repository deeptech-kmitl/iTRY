"use server"
import { getIncomingActivity } from "@/app/api/sortActivity/[user]/incoming/route";
import { IncomingContainer } from "./IncomingContainer";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";

export default async function IncomingServer() {

  const incomingActivity = await getIncomingActivity();

  return (
    <IncomingContainer activity={incomingActivity?.data as ITryActivity} />
  )
}