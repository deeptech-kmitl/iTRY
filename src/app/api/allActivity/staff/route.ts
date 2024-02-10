import { NextRequest, NextResponse } from 'next/server';
const tableName = 'StaffActivities'
import iTryDynamoDB from "@/app/api/utils/dynamoDB";

export async function PUT(req: NextRequest) {
    
    try {
        const {
            activityId,
            activityName,
            imageUrl,
            visibility,
            activityDetail,
            jobPositions,
            schedule,
            phoneNumber,
            email,
            applyLink,
            faq
        } = await req.json();
        
        let updateExpression = 'set imageUrl = :newImageUrl, activityName = :newActivityName, activityDetail = :newActivityDetail, jobPositions = :newJobPosition ,visibility = :newVisibility, schedule = :newSchedule, phoneNumber = :newPhoneNumber, email= :newEmail, applyLink= :newApplyLink, faq = :newFaq'
        let expressionAttributeValue = {
            ':newImageUrl': imageUrl,
            ':newActivityName': activityName,
            ':newActivityDetail': activityDetail,
            ":newJobPositions": jobPositions,
            ':newVisibility': visibility,
            ':newSchedule': schedule,
            ':newPhoneNumber': phoneNumber,
            ':newEmail': email,
            ':newApplyLink': applyLink,
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