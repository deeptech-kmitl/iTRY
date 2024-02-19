"use server"

import { getActivitiesDesc } from "@/app/api/sortActivity/[user]/desc/route";
import { ActivityApiData } from "@/app/utils/ManageActivityPage/activity";
import AllActivitiesContainer from "./AllActivitiesContainer";
import { ApiError } from "../global";

export default async function AllActivitiesServer() {
  const activities = await getActivitiesDesc("camper", 1, 3) as ActivityApiData | ApiError | undefined;
  return (
    <div className="py-16">
      <div className="pb-5">
        <div className="text-base md:text-2xl flex items-center">
          <p className="mr-2">รายชื่อกิจกรรมทั้งหมด</p>
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios-filled/50/FFFFFF/more-than.png"
            alt="more-than"
          />
        </div>
      </div>
      <AllActivitiesContainer activitiesData={activities} />
    </div>
  )
}