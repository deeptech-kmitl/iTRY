"use server"
import dynamic from 'next/dynamic';
const RegisteringActivitiesContainer = dynamic(() => import('./RegisteringActivitiesContainer'), { ssr: false });
import { getRegisteringActivities } from "@/app/api/registeringActivities/route"
import { ActivityApiData, ITryActivity } from "@/app/utils/ManageActivityPage/activity";
import { ApiDataList, ApiError } from "../global";



export default async function RegisteringActivitiesServer() {
  
  const result = await getRegisteringActivities() as ApiDataList<ITryActivity> | ApiError | undefined

  return (
    <RegisteringActivitiesContainer activity={result} />
  )
}