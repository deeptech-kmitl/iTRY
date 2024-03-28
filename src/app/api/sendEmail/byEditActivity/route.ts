import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import iTryDynamoDB from "@/app/api/utils/dynamoDB";
import { SendEmail } from '@/app/utils/ManageEmail/email'
import { getAllUser } from '@/app/api/users/route';
import { ApiDataList, ApiError } from '@/app/components/global';
import { getActivitiesDesc } from '@/app/api/sortActivity/[user]/desc/route';
import { ActivityApiData } from '@/app/utils/ManageActivityPage/activity';
import { User } from 'next-auth';
import { Notification } from '@/app/utils/ManageEmail/email';
import { updateNotification } from '@/app/api/notification/route';
import getActivities from '../../crudActivity/route';
import sendEmail from '../route';

export async function sendEmailAndNoti(activityId: string) {
    // Get user and activity data
    const users = await getAllUser() as ApiDataList<User> | ApiError | undefined

    const combinedActivies = await getActivities() as ActivityApiData


    if (users?.status === "error") throw new Error("")
    const activeUsers = users?.data?.filter(user => user?.receiveEmail)



    const followerData = activeUsers?.filter(user => {
        return user.activitiesFollow.some(activityFallow => activityFallow.activityId === activityId)
    })

    const updatedActivityData = combinedActivies.data.find(activity => activity.activityId === activityId)

    const currentDate = new Date();

    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    const sendDate = `${month}-${day} ${hours}:${minutes}`;

    followerData?.map(async user => {

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
    
}