
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
const tableName = 'CamperActivities';
import iTryDynamoDB from "@/app/api/utils/dynamoDB";
import { ITryActivity } from '@/app/utils/ManageActivityPage/activity';

async function POST(req: ITryActivity) {
    try {
        console.log("start upload")
        console.log("req", req)
        const {
            activityName,
            imageUrl,
            visibility,
            activityDetails,
            schedule,
            phone,
            email,
            applyLink,
            igLink,
            facebookLink,
            faq
        } = req;

        const activityId = await uuidv4();

        const paramsDynamo = {
            TableName: tableName,
            Item: {
                activityId: activityId,
                activityName: activityName,
                imageUrl: imageUrl,
                activityDetails: activityDetails,
                visibility: visibility,
                schedule: schedule,
                phone: phone,
                email: email,
                applyLink: applyLink,
                igLink: igLink,
                facebookLink: facebookLink,
                faq: faq
            },
        };

        console.log("paramsDynamo", paramsDynamo)

        const insertDynamo = await iTryDynamoDB.put(paramsDynamo).promise();
        console.log("insertDynamo", insertDynamo);
        return NextResponse.json("success")
    } catch (error) {
        console.log("error", error)
        return NextResponse.json(error);
    }
}

export async function PUT(req: ITryActivity) {
    try {
        const {
            activityName,
            imageUrl,
            visibility,
            activityDetails,
            schedule,
            phone,
            email,
            applyLink,
            igLink,
            facebookLink,
            faq,
            activityId
        } = req;
        let updateExpreession = 'set imageUrl = :newImageUrl, activityName = :newActivityName, activityDetail = :newActivityDetail, visibility = :newVisibility, schedule = :newSchedule, phoneNumber = :newPhoneNumber, email= :newEmail, applyLink= :newApplyLink, instagram = :newInstagram, facebook = :newFacebook, faq = :newFaq'
        let expressionAttributeValue = {
            ':newImageUrl': imageUrl,
            ':newActivityName': activityName,
            ':newActivityDetail': activityDetails,
            ':newVisibility': visibility,
            ':newSchedule': schedule,
            ':newPhoneNumber': phone,
            ':newEmail': email,
            ':newApplyLink': applyLink,
            ':newInstagram': igLink,
            ':newFacebook': facebookLink,
            ':newFaq': faq
        }

        const paramsDynamo = {
            TableName: tableName,
            Key:{
                activityId: activityId
            },
            
            UpdateExpression: updateExpreession,
            ExpressionAttributeValues: expressionAttributeValue,
            ReturnValues: "UPDATED_NEW"
        };
        const updateDynamo = await iTryDynamoDB.update(paramsDynamo).promise();
        return NextResponse.json("update success: " + activityName)
    }catch(err){
        console.log(err)
    }
}

export async function DELETE(req: ITryActivity) {
    try {
        const {activityId} =await req;
        const paramsDynamo = {
            TableName: tableName,
            Key:{
                activityId: activityId
            }
        }
        const deleteDynamo = await iTryDynamoDB.delete(paramsDynamo).promise();
        console.log("DeleteDynamo", deleteDynamo);
        return NextResponse.json("delete success: " + activityId)
    } catch (err) {
        console.log(err)
    }
} 

export { POST as createCamperActivity }