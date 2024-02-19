"use server";

import { getActivitiesDesc } from "@/app/api/sortActivity/[user]/desc/route";
import HeaderActivityAdmin from "@/app/components/ActivityAdmin/ActivitiesAdmin";
import AllActivitiesContainer from "@/app/components/Home/AllActivitiesContainer";
import { ApiError } from "@/app/components/global";
import { ActivityApiData } from "@/app/utils/ManageActivityPage/activity";

interface ActivitiesAdminPageProps { 
  searchParams: { page: string }
 }

export default async function ActivitiesAdminPage({ searchParams }: ActivitiesAdminPageProps) {

  const page = parseInt(searchParams?.page) || 1
  const activitiesCamper = await getActivitiesDesc("camper", page, 5) as ActivityApiData | ApiError | undefined;
  const activitiesStaff = await getActivitiesDesc("staff", page, 5) as ActivityApiData | ApiError | undefined;

  return (
    <HeaderActivityAdmin activitiesCamper={activitiesCamper} activitiesStaff={activitiesStaff} page={page}  />
  )
}
