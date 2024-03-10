"use server"
import dynamic from 'next/dynamic';
const AllActivitiesContainer = dynamic(() => import('./AllActivitiesContainer'), { ssr: false });
import { getActivitiesDesc } from "@/app/api/sortActivity/[user]/desc/route";
import { ActivityApiData } from "@/app/utils/ManageActivityPage/activity";
import { ApiError } from "../global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

export default async function AllActivitiesServer() {
  const activities = await getActivitiesDesc("camper", 1, 3) as ActivityApiData | ApiError | undefined;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-base md:text-2xl flex items-center">
        <Link href="/camper/activities" shallow>
          <p className="mr-2">รายชื่อกิจกรรมสำหรับผู้เข้าร่วมกิจกรรมทั้งหมด</p>
        </Link>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <AllActivitiesContainer activitiesData={activities} />
    </div>
  )

}