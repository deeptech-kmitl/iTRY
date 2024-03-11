import { Notification } from "@/app/utils/ManageEmail/email";
import iTryDynamoDB from "../utils/dynamoDB";
import { getAllUser } from "../users/route";
import { ApiDataList, ApiError } from "@/app/components/global";
import { User } from "next-auth";
import { convertDateToString } from "@/app/utils/converDateToString";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";

export async function updateNotification(userId: string, email: string, newNotification: Notification[]) {
    try {
        console.log("userId:", userId, "activity:", newNotification);

        // Append the new activity to the activitiesFollow array
        const paramsDynamo = {
            TableName: "Users",
            Key: {
                id: userId,
                email: email,
            },
            UpdateExpression: "SET #notifications = :newValue",
            ExpressionAttributeNames: {
                "#notifications": "notifications",
            },
            ExpressionAttributeValues: {
                ":newValue": newNotification,
            },
            ReturnValues: "UPDATED_NEW",
        };


        // Add activity into DynamoDB
        const response = await iTryDynamoDB.update(paramsDynamo).promise();
        console.log(email, " >>>> User be send Noti >>>>> ", response.Attributes)
        return {
            status: "success",
        };
    } catch (error) {
        console.error("Unable to update item:", error);
        throw error;
    }
}

export async function updateNotificationEditActivity(activity: ITryActivity) {
    try {
        const users = await getAllUser() as ApiDataList<User> | ApiError | undefined
        if (users?.status === "error") throw new Error("")
        const filterUsers = users?.data?.filter(user => user?.activitiesFollow?.some(activityFollow => activityFollow.activityId === activity.activityId))
        
        filterUsers?.map(async (user) => {
            const newNotification: Notification = {
                activityId: activity.activityId || "",
                activityDetail: "อย่าลืมตรวจสอบ !!",
                activityName: `มีการแก้ไขข้อมูลกิจกรรม ${activity.activityName}`,
                sendDate: convertDateToString(new Date())
            }

            const newNotifications: Notification[] = [...user.notifications, newNotification]
            await updateNotification(user.id, user.email, newNotifications)
        })
    } catch (error) {
        throw error;
    }
}