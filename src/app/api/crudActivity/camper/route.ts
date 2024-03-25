"use server"
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import iTryDynamoDB from "@/app/api/utils/dynamoDB";
import { ITryActivity } from '@/app/utils/ManageActivityPage/activity';

const tableName = 'CamperActivities';
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
                faq: faq,
                typeActivity: "camper"
            },
        };


        const insertDynamo = await iTryDynamoDB.put(paramsDynamo).promise();
        return {
            activityId: activityId,
            status: "success"
        }
    } catch (error) {

        throw error
    }
}

export async function updateCamperActivity(req: ITryActivity) {

    console.log("updateCamperActivity ")
    console.log("req", req)


    try {
        const {
            activityName,
            imageUrl,
            visibility,
            activityDetails = null,
            schedule = null,
            openDate,
            closeDate,
            phone = null,
            email = null,
            applyLink = null,
            igLink = null,
            facebookLink = null,
            faq = null,
            activityId,
            typeActivity
        } = req;
        let updateExpreession = 'set imageUrl = :newImageUrl, activityName = :newActivityName, activityDetails = :newActivityDetails, visibility = :newVisibility, schedule = :newSchedule, openDate = :newOpenDate, closeDate = :newCloseDate, phone = :newPhone, email= :newEmail, applyLink= :newApplyLink, igLink = :newIgLink, facebookLink = :newFacebookLink, faq = :newFaq, typeActivity = :typeActivity'
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
            ':newFaq': faq,
            ":typeActivity": typeActivity
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
            status: "success",
            activityId: activityId,
        }
    }catch(error){
        throw error
    }
}

export async function deleteCamperActivity(activityId: string) {
    try {
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
        throw error
    }
} 
