import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import cron from 'node-cron'
import { CronJob } from "cron";
import axios from 'axios'
import { schedule } from '../create/staffActivity/mockupData';
import { Console } from 'console';
import { DynamoDB } from 'aws-sdk';
import iTryDynamoDB from "@/app/api/utils/dynamoDB";

const dynamodb = new DynamoDB.DocumentClient({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
})
export async function POST(request: any) {

    const paramsUsers = {
        TableName: 'TestUsers', // TODO: Change to 'Users'
    }
    const paramsStaffAct = {
        TableName: 'StaffActivities',
    }
    const paramsCamperAct = {
        TableName: 'CamperActivities',
    }

    try {
        console.log("_______ Begin ________")
        const {title, subject, message} = await request.json()

        // ------------- GET Users From DynamoDB -------------
        const usersData = await dynamodb.scan(paramsUsers).promise()
        const usersEmail = (usersData.Items ?? []).map(item => item.email)
        console.log("USERS -> ", usersEmail)

        // ------------- GET Staff Activity From DynamoDB -------------
        const staffActData = await dynamodb.scan(paramsStaffAct).promise()

        // Tomorrow Date String
        const tomorrowDate = new Date()
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        const year = tomorrowDate.getFullYear();
        const month = String(tomorrowDate.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrowDate.getDate()).padStart(2, '0');

        const tomorrowDateString = `${year}-${month}-${day}`
        console.log("Tomorrow Date String -- ", tomorrowDateString)
        const testDateDB = (staffActData.Items ?? []).map(item => item.openDate)
        console.log("TEST DATE -> ", testDateDB)

        // <<<<<<<<<<<<<<<<<<<<<<<< SEND EMAIL, FILTER BY OPEN DATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        // MAP necessary data to send email
        const staffActivities = (staffActData.Items ?? [])
        .filter(item => item.openDate == tomorrowDateString)
        .map(item => ({
            activityName: item.activityName,
            activityDetails: item.activityDetails,
            openDate: item.openDate,
            activityLink: 'http://localhost:3000/api/activityById/staff/' + item.activityId,
        }))
        console.log("STAFF ACTIVITY -> ", staffActivities.map(activity => activity.activityName))

        // ------------- GET Camper Activity From DynamoDB -------------
        const camperActData = await dynamodb.scan(paramsCamperAct).promise()
        const camperActivities = (camperActData.Items ?? [])
        .filter(item => item.openDate == tomorrowDateString)
        .map(item => ({
            activityName: item.activityName,
            activityDetails: item.activityDetails,
            openDate: item.openDate,
            activityLink: 'http://localhost:3000/api/activityById/camper/' + item.activityId,
        }))
        console.log("CAMPER ACTIVITY -> ", camperActivities.map(activity => activity.activityName))

        const combinedActivities = [...staffActivities, ...camperActivities]
        console.log("Combined Staff & Camper Activities -> ", combinedActivities)

        // Check if there are staff activities scheduled for tomorrow
        if (combinedActivities.length === 0) {
            console.log("No any activities scheduled for tomorrow. Skipping email.");
            return NextResponse.json({ message: "No any activities scheduled for tomorrow" }, { status: 200 });
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
                subject: title,
                html: `
                <h3>Welcome to iTRY activity !</h3>
                <p>Title: ${subject}</p>
                <p>Message: ${message}</p>
                    <h4>${activity.activityName}</h4>
                    <p>Details: ${activity.activityDetails}</p>
                    <p>Link: <a href="${activity.activityLink}">${activity.activityLink}</a></p>
                `
            }

            await transporter.sendMail(mailOption)
            console.log("_______ Finish SEND OPEN DATE EMAIL ________")
        }

        // <<<<<<<<<<<<<<<<<< SEND EMAIL, FILTER BY SCHEDULE (FOLLOWED ACTIVITY) >>>>>>>>>>>>>>>>>>>>>>>>
        const usersFollowedAct = (usersData.Items ?? []).filter(user => {
            const followedActivities = user.followedActivityId || []
            return followedActivities.some((activityId: string) => {
                return (
                    (camperActData.Items ?? []).some(item => 
                        item.schedule.some((scheduleItem: any) => 
                            scheduleItem.date == tomorrowDateString && item.activityId == activityId
                        )
                    ) || 
                    (staffActData.Items ?? []).some(item => 
                        item.schedule.some((scheduleItem: any) => 
                            scheduleItem.date == tomorrowDateString && item.activityId == activityId
                        )
                    )
                )
            })
        })

        console.log("USER FOLLOW DATA _________",usersFollowedAct)
        const emailFollowedAct = usersFollowedAct.map(user => user.email)
        console.log("EMAIL THAT FOLLOWING ACTIVITIES -> ", emailFollowedAct)

        if (emailFollowedAct.length === 0) {
            console.log("No users to email. Skipping email.");
            return NextResponse.json({ message: "No users to email" }, { status: 200 });
        }

        for (const email of emailFollowedAct) {
            const user = (usersData.Items ?? []).find((user: any) => user.email === email)
            console.log("USER ___ ", user)

            const followedActivities = user?.followedActivityId || [];
            console.log("FOLLOW ACTIVITY ___ ", followedActivities)

            const acitivitySchedule = followedActivities.flatMap((activityId: any) => {
                const activityDetails = (camperActData.Items ?? []).find(item => 
                    item.activityId === activityId
                ) || (staffActData.Items ?? []).find(item => 
                    item.activityId === activityId
                )
                console.log("ACTIVITY DETAIL -- ", activityDetails)
                
                if (activityDetails && Array.isArray(activityDetails.schedule)) {
                    return activityDetails.schedule.filter((scheduleItem: any) =>
                        scheduleItem.date === tomorrowDateString
                    );
                }
                return [];
            })
            console.log("SCHEDULE -> ", acitivitySchedule)

            for (const scheduleItem of acitivitySchedule) {
                const mailOption = {
                    from: 'itrydpd@gmail.com',
                    to: email,
                    subject: title,
                    html: `
                    <h3>Hello Activity Follower !</h3>
                    <p>Title: ${subject}</p>
                    <p>Message: ${message}</p>
                    <p>Activities scheduled for tomorrow:</p>
                    <ul>
                        <li>Date: ${scheduleItem.date}</li>
                        <li>Detail: ${scheduleItem.details}</li>
                    </ul>
                    `
                }
                await transporter.sendMail(mailOption);
                console.log("SCHEDULE Email sent to user: ", email)
            }

        }

        return NextResponse.json({message: "Email Sent Successfully"}, {status: 200})
    }
    catch(error) {
        console.error(error)
        return NextResponse.json({message: "Fail to send Email"}, {status: 500})
    }


}
