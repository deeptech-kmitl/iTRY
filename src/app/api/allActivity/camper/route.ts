
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
const tableName = 'CamperActivities';
import iTryDynamoDB from "@/app/api/utils/dynamoDB";

export async function POST(req: NextRequest) {
    try {
        const {
            activityName,
            imageUrl,
            visibility,
            activityDetail,
            schedule,
            phoneNumber,
            email,
            applyLink,
            instagram,
            facebook,
            faq
        } = await req.json();
        const activityId = await uuidv4();

        const paramsDynamo = {
            TableName: tableName,
            Item: {
                activityId: activityId,
                activityName: activityName,
                imageUrl: imageUrl,
                activityDetail: activityDetail,
                visibility: visibility,
                schedule: schedule,
                phoneNumber: phoneNumber,
                email: email,
                applyLink: applyLink,
                instagram: instagram,
                facebook: facebook,
                faq: faq
            },
        };

        const insertDynamo = await iTryDynamoDB.put(paramsDynamo).promise();
        console.log("insertDynamo", insertDynamo);
        return NextResponse.json("success")
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function PUT(req: NextRequest) {
    try {
        const {
            activityId,
            activityName,
            imageUrl,
            visibility,
            activityDetail,
            schedule,
            phoneNumber,
            email,
            applyLink,
            instagram,
            facebook,
            faq
        } = await req.json();
        let updateExpreession = 'set imageUrl = :newImageUrl, activityName = :newActivityName, activityDetail = :newActivityDetail, visibility = :newVisibility, schedule = :newSchedule, phoneNumber = :newPhoneNumber, email= :newEmail, applyLink= :newApplyLink, instagram = :newInstagram, facebook = :newFacebook, faq = :newFaq'
        let expressionAttributeValue = {
            ':newImageUrl': imageUrl,
            ':newActivityName': activityName,
            ':newActivityDetail': activityDetail,
            ':newVisibility': visibility,
            ':newSchedule': schedule,
            ':newPhoneNumber': phoneNumber,
            ':newEmail': email,
            ':newApplyLink': applyLink,
            ':newInstagram': instagram,
            ':newFacebook': facebook,
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
