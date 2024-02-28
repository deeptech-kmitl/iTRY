import { ActivityApiData } from "@/app/utils/ManageActivityPage/activity"
import { getActivitiesDesc } from "../sortActivity/[user]/desc/route"
import { ApiDataList, ApiError } from "@/app/components/global"
import { getAllUser } from "../users/route"
import { User } from "next-auth"


export async function getRegisteringActivities(page: number, limit: number, showPage: string) {

    const offset = page ? (page - 1) * limit : 0;

    try {

        const activitiesStaff = await getActivitiesDesc("staff", 1, 5) as ActivityApiData | ApiError | undefined
        const activitiesCamper = await getActivitiesDesc("camper", 1, 5) as ActivityApiData | ApiError | undefined

        if (activitiesStaff?.status === "error" || activitiesCamper?.status === "error") throw new Error("")

        const convertActivitiesCamper = activitiesCamper?.data || []
        const convertActivitieStaff = activitiesStaff?.data || []

        const combinedActivies = [...convertActivitiesCamper, ...convertActivitieStaff]

        console.log('>>> Combine >>> ', combinedActivies)

        const currentDate = new Date()
        const registeringActivities = combinedActivies.filter(activity => {
            return new Date(activity.openDate).getTime() <= currentDate.getTime() && currentDate.getTime()  <= new Date(activity.closeDate).getTime()
        })

        const sortedRegistering = registeringActivities.sort(
            (a, b) => new Date(a.openDate).getTime() - new Date(b.openDate).getTime()
        );

        console.log('>>> Registering >>> ', sortedRegistering)

        const pagenationRegisteringAct = sortedRegistering.slice(offset, offset + limit)

        return {
            data: showPage === 'AllRegistering' ? pagenationRegisteringAct : showPage === 'Home' ? sortedRegistering : null,
            countActivities: sortedRegistering.length,
            status: 'success'
        }
    }
    catch(error) {
        throw error
    }

}