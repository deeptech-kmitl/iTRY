
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
const tableName = 'CamperActivities';
import iTryDynamoDB from "@/app/api/utils/dynamoDB";
import { ITryActivity } from '@/app/utils/ManageActivityPage/activity';

export async function createCamperActivity(req: ITryActivity) {
    try {
        console.log("start upload")
        console.log("req", req)
        const {
            activityName,
            imageUrl,
            visibility,
            activityDetails,
            schedule,
            openDate,
            closeDate,
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
                openDate: openDate,
                closeDate: closeDate,
                phone: phone,
                email: email,
                applyLink: applyLink,
                igLink: igLink,
                facebookLink: facebookLink,
                faq: faq
            },
        };


        const insertDynamo = await iTryDynamoDB.put(paramsDynamo).promise();
        return {
            activityId: activityId,
            status: "success"
        }
    } catch (error) {

        return {
            status: "error",
            message: error
        }
    }
}

export async function updateCamperActivity(req: ITryActivity) {
    try {
        const {
            activityName,
            imageUrl,
            visibility,
            activityDetails,
            schedule,
            openDate,
            closeDate,
            phone,
            email,
            applyLink,
            igLink,
            facebookLink,
            faq,
            activityId
        } = req;
        let updateExpreession = 'set imageUrl = :newImageUrl, activityName = :newActivityName, activityDetails = :newActivityDetails, visibility = :newVisibility, schedule = :newSchedule, openDate = :newOpenDate, closeDate = :newCloseDate, phone = :newPhone, email= :newEmail, applyLink= :newApplyLink, igLink = :newIgLink, facebookLink = :newFacebookLink, faq = :newFaq'
        let expressionAttributeValue = {
            ':newImageUrl': imageUrl,
            ':newActivityName': activityName,
            ':newActivityDetails': activityDetails,
            ':newVisibility': visibility,
            ':newSchedule': schedule,
            ':newOpenDate': openDate,
            ':newCloseDate': closeDate,
            ':newPhone': phone,
            ':newEmail': email,
            ':newApplyLink': applyLink,
            ':newIgLink': igLink,
            ':newFacebookLink': facebookLink,
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
        return {
            status: "success"
        }
    }catch(error){
        return {
            status: "error",
            message: error
        }
    }
}

export async function deleteCamperActivity(req: ITryActivity) {
    try {
        const {activityId} = await req;
        const paramsDynamo = {
            TableName: tableName,
            Key:{
                activityId: activityId
            }
        }
        const deleteDynamo = await iTryDynamoDB.delete(paramsDynamo).promise();
        return {
            status: "success"
        }
    } catch (error) {
        return {
            status: "error",
            message: error
        }
    }
} 
