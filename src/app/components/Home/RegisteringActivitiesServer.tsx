"use server"
import dynamic from 'next/dynamic';
const RegisteringActivitiesContainer = dynamic(() => import('./RegisteringActivitiesContainer'), { ssr: false });
import { getRegisteringActivities } from "@/app/api/registeringActivities/route"
import { ActivityApiData, ITryActivity } from "@/app/utils/ManageActivityPage/activity";
import { ApiDataList, ApiError } from "../global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";


export default async function RegisteringActivitiesServer() {
  
  const result = await getRegisteringActivities(1, 5, 'Home') as ApiDataList<ITryActivity> | ApiError | undefined

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl md:text-2xl flex items-center">
        <Link href="/registeringActivities" shallow>
          <p className="mr-2">กิจกรรมที่กำลังเปิดรับสมัคร</p>
        </Link>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <RegisteringActivitiesContainer activity={result} />
    </div>
  )
}