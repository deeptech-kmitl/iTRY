'use server'
import { getCamperActivity } from "@/app/api/activityById/camper/[id]/route";
import ManageActivityPage from "@/app/components/ManageActivityPage/ManageActivityPage"
import { TypeActivityParams } from "@/app/components/ManageActivityPage/activity"
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";

interface EditActivityPageProps {
  params: TypeActivityParams
}

export default async function EditActivityPage({ params }: EditActivityPageProps) {

  const paramAPI = {
    params: {
      id: params.activityId
    }
  }

  const activity = await getCamperActivity(undefined, paramAPI) as ITryActivity;

  return (
    <ManageActivityPage typeAction="edit" typeActivity={params.type} activity={activity} />
  )
}