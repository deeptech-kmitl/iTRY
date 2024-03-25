"use server"
import { TypeActivityParams } from '@/app/components/ManageActivityPage/activity';
import dynamic from 'next/dynamic';
const AllActivitiesContainer = dynamic(() => import('@/app/components/Home/AllActivitiesContainer'), { ssr: false });
import { getActivitiesDesc } from '@/app/api/sortActivity/[user]/desc/route';
import { ActivityApiData } from '@/app/utils/ManageActivityPage/activity';
import { ApiError } from '@/app/components/global';



interface ActivitiesPageProps {
  params: TypeActivityParams,
  searchParams: { page: string }
}

export default async function ActivitiesPage({ params, searchParams }: ActivitiesPageProps) {

  const page = parseInt(searchParams?.page || "") || 1;

  const activities = await getActivitiesDesc(params.type, page, 5) as ActivityApiData | ApiError | undefined;;
  return (
    <AllActivitiesContainer activitiesData={activities} page={page} showPagination />
  )
}