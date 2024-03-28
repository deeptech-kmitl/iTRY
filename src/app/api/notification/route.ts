"use server"
import { Notification } from "@/app/utils/ManageEmail/email";
import iTryDynamoDB from "../utils/dynamoDB";
import { getAllUser } from "../users/route";
import { ApiDataList, ApiError } from "@/app/components/global";
import { User } from "next-auth";
import { convertDateToString } from "@/app/utils/converDateToString";
import { ActivityApiData, ITryActivity } from "@/app/utils/ManageActivityPage/activity";
import getActivities from "../crudActivity/route";
import sendEmail from "../sendEmail/route";

export async function updateNotification(userId: string, email: string, newNotification: Notification[]) {
    try {
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

        const activeUsers = filterUsers?.filter(user => user?.receiveEmail)
        const combinedActivies = await getActivities() as ActivityApiData
        const updatedActivityData = combinedActivies.data.find(activityItem => activityItem.activityId === activity.activityId)

        const currentDate = new Date();

        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');

        const sendDate = `${month}-${day} ${hours}:${minutes}`;


        activeUsers?.map(async user => {

            const activityLink = `https://itryweb.com/${updatedActivityData?.typeActivity}/activity-details/${updatedActivityData?.activityId}`
    
            const mailOption = {
                from: process.env.SMTP_EMAIL,
                to: user.email,
                subject: `📢 ประกาศจากกิจกรรม ${updatedActivityData?.activityName}`,
                html: `
                    <p>✨ มีการอัปเดตข้อมูลในกิจกรรม ${updatedActivityData?.activityName}</p>
                    <p>⚠️ อย่าลืม!! เข้าไปดูรายละเอียดใหม่ได้ที่ <a href="${activityLink}">${activityLink}</a></p>
                `
            }
    
            const newNotification: Notification = {
                activityId: updatedActivityData?.activityId ?? '',
                activityName: updatedActivityData?.activityName ?? '',
                activityDetail: 'Some activity information has changed, please visit the web page.',
                sendDate: sendDate,
                redirectLink: activityLink
            }
    
            const newNotifications: Notification[] = [...user?.notifications, newNotification]

            await updateNotification(user.id, user.email, newNotifications)
            await sendEmail(mailOption)
        })

    } catch (error) {
        throw error;
    }
}