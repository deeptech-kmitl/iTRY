"use server"
import dynamic from 'next/dynamic';
const ActivityContainer = dynamic(() => import('@/app/components/DetailActivity/ActivityContainer'), { ssr: false });
import { TypeActivityParams } from '@/app/components/ManageActivityPage/activity';
import { getCamperActivity } from '@/app/api/activityById/camper/[id]/route';
import { getStaffActivity } from '@/app/api/activityById/staff/[id]/route';
import { ITryActivity } from '@/app/utils/ManageActivityPage/activity';

interface ActivityDetailsPageProps {
  params: TypeActivityParams
}

export default async function ActivityDetailsPage({ params }: ActivityDetailsPageProps) {

  const typeActivity = params.type
  const activity = await (typeActivity === "camper" ? getCamperActivity(params.activityId) : getStaffActivity(params.activityId)) as ITryActivity;

  return (
    <ActivityContainer activity={activity} />
  )
}