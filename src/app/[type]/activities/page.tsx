"use server"
import { getActivitiesDesc } from "@/app/api/sortActivity/[user]/desc/route";
import AllActivitiesContainer from "@/app/components/Home/AllActivitiesContainer";
import { TypeActivityParams } from "@/app/components/ManageActivityPage/activity";
import { ApiDataList, ApiError } from "@/app/components/global";
import { ActivityApiData, ITryActivityCard } from "@/app/utils/ManageActivityPage/activity";
import { useSearchParams } from "next/navigation";


interface ActivitiesPageProps {
  params: TypeActivityParams,
  searchParams: {page: string}
}

export default async function ActivitiesPage({ params, searchParams }: ActivitiesPageProps) {

  const page = parseInt(searchParams?.page || "") || 1;

  const activities = await getActivitiesDesc(params.type, page, 3) as ActivityApiData | ApiError | undefined;;
  console.log("activities", activities)
  return (
    <AllActivitiesContainer activitiesData={activities} page={page} showPagination />
  )
}