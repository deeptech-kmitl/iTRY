"use server"
import dynamic from 'next/dynamic';
const IncomingContainer = dynamic(() => import('./IncomingContainer'), { ssr: false });
import { getIncomingActivity } from "@/app/api/sortActivity/[user]/incoming/route";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";

export default async function IncomingServer() {

  const incomingActivity = await getIncomingActivity();

  return (
    <IncomingContainer activity={incomingActivity?.data as ITryActivity} />
  )

}