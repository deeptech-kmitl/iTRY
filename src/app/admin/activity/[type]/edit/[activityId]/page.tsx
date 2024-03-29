'use server'
import dynamic from 'next/dynamic';
const ManageActivityPage = dynamic(() => import('@/app/components/ManageActivityPage/ManageActivityPage'), { ssr: false });
import { getCamperActivity } from "@/app/api/activityById/camper/[id]/route";
import { getStaffActivity } from "@/app/api/activityById/staff/[id]/route";
import { TypeActivityParams } from "@/app/components/ManageActivityPage/activity"
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";

interface EditActivityPageProps {
  params: TypeActivityParams
}

export default async function EditActivityPage({ params }: EditActivityPageProps) {
  const typeActivity = params.type
  const activity = await (typeActivity === "camper" ? getCamperActivity(params.activityId) : getStaffActivity(params.activityId)) as ITryActivity;

  return (
    <ManageActivityPage typeAction="edit" typeActivity={params.type} activity={activity} />
  )

}