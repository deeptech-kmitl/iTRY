"use server";

import dynamic from 'next/dynamic';
const HeaderActivityAdmin = dynamic(() => import('@/app/components/ActivityAdmin/ActivitiesAdmin'), { ssr: false });
import { getActivitiesDesc } from "@/app/api/sortActivity/[user]/desc/route";
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
    <HeaderActivityAdmin activitiesCamper={activitiesCamper} activitiesStaff={activitiesStaff} page={page} />
  )
}
