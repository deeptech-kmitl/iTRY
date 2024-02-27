import { ActivityApiData } from "@/app/utils/ManageActivityPage/activity"
import { getActivitiesDesc } from "../sortActivity/[user]/desc/route"
import { ApiDataList, ApiError } from "@/app/components/global"
import { getAllUser } from "../users/route"
import { User } from "next-auth"


export async function getRegisteringActivities() {
    try {

        const activitiesStaff = await getActivitiesDesc("staff", 1, 1000000) as ActivityApiData | ApiError | undefined
        const activitiesCamper = await getActivitiesDesc("camper", 1, 1000000) as ActivityApiData | ApiError | undefined

        if (activitiesStaff?.status === "error" || activitiesCamper?.status === "error") throw new Error("")

        const convertActivitiesCamper = activitiesCamper?.data || []
        const convertActivitieStaff = activitiesStaff?.data || []

        const combinedActivies = [...convertActivitiesCamper, ...convertActivitieStaff]

        console.log('>>> Combine >>> ', combinedActivies)

        const currentDate = new Date()
        const registeringActivities = combinedActivies.filter(activity => {
            return new Date(activity.openDate).getTime() <= currentDate.getTime() && currentDate.getTime()  <= new Date(activity.closeDate).getTime()
        })

        console.log('>>> Registering >>> ', registeringActivities)

        return {
            data: registeringActivities,
            status: 'success'
        }
    }
    catch(error) {
        throw error
    }
}