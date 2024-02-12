import { NextRequest, NextResponse } from 'next/server';
const tableName = 'StaffActivities'
import iTryDynamoDB from "@/app/api/utils/dynamoDB";
import { ITryActivity } from '@/app/utils/ManageActivityPage/activity';

async function PUT(req: ITryActivity) {
    
    try {
        const {
            activityId,
            activityName,
            imageUrl,
            visibility,
            activityDetails,
            jobPositions,
            schedule,
            phone,
            email,
            igLink,
            facebookLink,
            applyLink,
            faq
        } = req;
        
        let updateExpression = 'set imageUrl = :newImageUrl, activityName = :newActivityName, activityDetails = :newActivityDetails, jobPositions = :newJobPosition ,visibility = :newVisibility, schedule = :newSchedule, phone = :newPhone, email= :newEmail, applyLink= :newApplyLink, igLink = :newIgLink, facebookLink = :newFacebookLink, faq = :newFaq'
        let expressionAttributeValue = {
            ':newImageUrl': imageUrl,
            ':newActivityName': activityName,
            ':newActivityDetails': activityDetails,
            ":newJobPositions": jobPositions,
            ':newVisibility': visibility,
            ':newSchedule': schedule,
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
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValue,
            ReturnValues: "UPDATED_NEW"
        };
        const updateDynamo = await iTryDynamoDB.update(paramsDynamo).promise();
        return NextResponse.json("update success: " + activityName)
    }catch(err){
        console.log(err)
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const {activityId} =await req.json();
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

export {PUT as updateStaffActivity}