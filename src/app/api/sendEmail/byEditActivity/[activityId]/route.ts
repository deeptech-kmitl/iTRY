import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import iTryDynamoDB from "@/app/api/utils/dynamoDB";
import { postNotification } from '@/app/api/notification/[userId]/route';
import { SendEmail } from '@/app/utils/ManageEmail/email'

export async function GET(res: SendEmail, { params }: any) {
    console.log("___ SEND EMAIL ___")

    const {activityId} = params

    const paramsUsers = {
        TableName: 'TestUser', // TODO: Change to 'Users'
    }
    const paramsStaffAct = {
        TableName: 'StaffActivities',
    }
    const paramsCamperAct = {
        TableName: 'CamperActivities',
    }

    const usersData = await iTryDynamoDB.scan(paramsUsers).promise()
    const staffActData = await iTryDynamoDB.scan(paramsStaffAct).promise()
    const camperActData = await iTryDynamoDB.scan(paramsCamperAct).promise()


    // Get user that follow activity
    const usersFollowedAct = (usersData.Items ?? []).filter(user => {
        const followedActivities = user.followedActivityId || []
        return followedActivities.includes(activityId)
    })
    console.log(">>> User Data that follow activity: ", usersFollowedAct)


    // Find activity name
    const activityName = ((staffActData.Items ?? [])
        .find(item => item.activityId === activityId) || {}).activityName
            || ((camperActData.Items || [])
            .find(item => item.activityId === activityId) || {}).activityName
    
    console.log("Activity Name: ", activityName)
    
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { // for sender
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })

    for (const user of usersFollowedAct) {
        const mailOption = {
            from: 'itrydpd@gmail.com',
            to: user.email,
            subject: `📢 The ${activityName} activity has updated`,
            html: `
                <p>Some activity information has changed, please visit the web.</p>
            `
        }
        await transporter.sendMail(mailOption)

        await postNotification({
            activityName: `${activityName}`,
            activityDetail: `Some activity information has changed, please visit.`,
            followerId: user.userId
        })
    }
    
}