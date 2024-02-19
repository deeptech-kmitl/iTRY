import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import cron from 'node-cron'
import { CronJob } from "cron";
import axios from 'axios'
import { schedule } from '../../create/staffActivity/mockupData';
import { Console } from 'console';
import { DynamoDB } from 'aws-sdk';
import iTryDynamoDB from "@/app/api/utils/dynamoDB";
import { getNotification, postNotification } from '../../notification/[userId]/route';

export async function GET() {

    const paramsUsers = {
        TableName: 'TestUser', // TODO: Change to 'Users'
    }
    const paramsStaffAct = {
        TableName: 'StaffActivities',
    }
    const paramsCamperAct = {
        TableName: 'CamperActivities',
    }

    try {
        console.log("_______ Begin ________")
        // const {title} = await request.json()

        // ------------- GET Users From DynamoDB -------------
        const usersData = await iTryDynamoDB.scan(paramsUsers).promise()
        const usersEmail = (usersData.Items ?? []).map(item => item.email)
        console.log("USERS -> ", usersEmail)

        // ------------- GET Staff Activity From DynamoDB -------------
        const staffActData = await iTryDynamoDB.scan(paramsStaffAct).promise()

        // Tomorrow Date String
        const tomorrowDate = new Date()
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        const year = tomorrowDate.getFullYear();
        const month = String(tomorrowDate.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrowDate.getDate()).padStart(2, '0');

        const tomorrowDateString = `${year}-${month}-${day}`
        console.log("Tomorrow Date String -- ", tomorrowDateString)
        // const testDateDB = (staffActData.Items ?? []).map(item => item.openDate)
        // console.log("TEST DATE -> ", testDateDB)

        // <<<<<<<<<<<<<<<<<<<<<<<< SEND EMAIL, FILTER BY OPEN DATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        // MAP necessary data to send email
        const staffActivities = (staffActData.Items ?? [])
        .filter(item => item.openDate == tomorrowDateString)
        .map(item => ({
            activityName: item.activityName,
            activityDetails: item.activityDetails,
            openDate: item.openDate,
            activityLink: 'http://localhost:3000/api/activityById/staff/' + item.activityId,
            imageUrl: item.imageUrl,
        }))

        // ------------- GET Camper Activity From DynamoDB -------------
        const camperActData = await iTryDynamoDB.scan(paramsCamperAct).promise()
        const camperActivities = (camperActData.Items ?? [])
        .filter(item => item.openDate == tomorrowDateString)
        .map(item => ({
            activityName: item.activityName,
            activityDetails: item.activityDetails,
            openDate: item.openDate,
            activityLink: 'http://localhost:3000/api/activityById/camper/' + item.activityId,
            imageUrl: item.imageUrl,
        }))

        const combinedActivities = [...staffActivities, ...camperActivities]

        // Check if there are staff activities scheduled for tomorrow
        if (combinedActivities.length === 0) {
            console.log("No any activities scheduled for tomorrow. Skipping email.");
            return { message: 'No any activities scheduled for tomorrow', status: 'error' }
        }
        
        // ------------ SEND EMAIL --------------
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

        for (const activity of combinedActivities) {
            const mailOption = {
                from: 'itrydpd@gmail.com',
                to: usersEmail.join(','),
                subject: '🔥 Let\' s join IT KMITL activities !!',
                html: `
                <h3>Welcome to ${activity.activityName} </h3>
                ${activity.activityDetails}
                ${activity.imageUrl ? `<img src="${activity.imageUrl}" alt="activity image">` : ''}
                <p>Visit Activity 👉 <a href="${activity.activityLink}">${activity.activityLink}</a></p>
                `
            }

            await transporter.sendMail(mailOption)
            console.log("_______ Finish SEND OPEN DATE EMAIL ________")

            await postNotification({
                activityName: `${activity.activityName}`,
                activityDetail: `${activity.activityDetails}`,
                followerId: 'sendAllId',
                sendDate: ''
            })

            console.log("--------- Finish SEND NOTIFICATION ---------")
        }

        // <<<<<<<<<<<<<<<<<< SEND EMAIL, FILTER BY SCHEDULE (FOLLOWED ACTIVITY) >>>>>>>>>>>>>>>>>>>>>>>>

        const usersFollowedAct = (usersData.Items ?? []).filter(user => {
            const followedActivities = user.followedActivityId || []
            return followedActivities.some((activityId: string) => {
                return (
                    (camperActData.Items ?? []).some(item => 
                        {
                            if (item.schedule) {
                                return item.schedule.some((scheduleItem: any) => 
                                    scheduleItem.date == tomorrowDateString && item.activityId == activityId)
                            }
                            return false
                        }
                        
                    ) || 
                    (staffActData.Items ?? []).some(item => 
                        {
                            if (item.schedule) {
                                return item.schedule.some((scheduleItem: any) => 
                                    scheduleItem.date == tomorrowDateString && item.activityId == activityId)
                            }
                            return false
                        }
                    )
                )
            })
        })

        console.log("USER FOLLOW DATA _________",usersFollowedAct)
        const emailFollowedAct = usersFollowedAct.map(user => user.email)

        if (emailFollowedAct.length === 0) {
            console.log("No users to email. Skipping email.");
            return { message: "No users to email", status: 'success' }
        }

        const allFollowerId = usersFollowedAct.map(user => user.userId)
        console.log('follower ---- > ', allFollowerId)

        for (const email of emailFollowedAct) {
            const user: any = (usersData.Items ?? []).find((user: any) => user.email === email)
            console.log("USER ___ ", user)

            const followedActivities = user?.followedActivityId || [];
            console.log("FOLLOW ACTIVITY ___ ", followedActivities)

            const followerId = user?.userId || []
            console.log('------ user that follow act ---> ', followerId)

            const acitivitySchedule = followedActivities.flatMap((activityId: any) => {
                const activityDetails = (camperActData.Items ?? []).find(item => 
                    item.activityId === activityId
                ) || (staffActData.Items ?? []).find(item => 
                    item.activityId === activityId
                )
                
                if (activityDetails && Array.isArray(activityDetails.schedule)) {
                    return activityDetails.schedule
                    .filter((scheduleItem: any) =>scheduleItem.date === tomorrowDateString)
                    .map((scheduleItem: any) => ({ ...scheduleItem, activityId }))
                }
                return [];
            })
            console.log("SCHEDULE -> ", acitivitySchedule)


            for (const scheduleItem of acitivitySchedule) {
                const activityDetails = (camperActData.Items ?? []).find(item => 
                    item.activityId === scheduleItem.activityId
                ) || (staffActData.Items ?? []).find(item => 
                    item.activityId === scheduleItem.activityId
                )

                const mailOption = {
                    from: 'itrydpd@gmail.com',
                    to: email,
                    subject: `🚨 ${(activityDetails ?? {}).activityName} scheduled for tomorrow !`,
                    html: `
                    <h2>${scheduleItem.title}</h2>
                    <h4>Details Activity</h4>
                        ${scheduleItem.details}
                    `
                }
                await transporter.sendMail(mailOption);
                console.log("SCHEDULE Email sent to user: ", email)

                await postNotification({
                    activityName: `${(activityDetails ?? {}).activityName}`,
                    activityDetail: scheduleItem.title,
                    followerId: followerId,
                    sendDate: ''
                })
            }

        }

        return NextResponse.json({ message: "Email Sent Successfully", status: 'success' })
    }
    catch(error) {
        console.error(error)
        return NextResponse.json({ message: "Fail to send Email", status: 'errror' })
    }
}
