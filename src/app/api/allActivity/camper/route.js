
import { NextResponse } from 'next/server';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamodb = new DynamoDB.DocumentClient({
    asscessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
});

export async function POST(req) {
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
            TableName: 'CamperActivities',
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

        const insertDynamo = await dynamodb.put(paramsDynamo).promise();
        console.log("insertDynamo", insertDynamo);
        return NextResponse.json("success: " + insertDynamo.activityName)
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function PUT(req) {
    const tableName = 'CamperActivities'
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
        let updateExpreession = 'set activityName = :newActivityName, activityDetail = :newActivityDetail, visibility = :newVisibility, schedule = :newSchedule, phoneNumber = :newPhoneNumber, email= :newEmail, applyLink= :newApplyLink, instagram = :newInstagram, facebook = :newFacebook, faq = :newFaq'
        let expressionAttributeValue = {
            ':newActivityName': activityName,
            // ':newImageUrl': imageUrl
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
        //check ว่ามีรูปไหม
        if(imageUrl){
            expressionAttributeValue[':newImageUrl'] = imageUrl
            updateExpreession += ', imageUrl = :newImageUrl'
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
        const updateDynamo = await dynamodb.update(paramsDynamo).promise();
        return NextResponse.json("update success: " + activityName)
    }catch(err){
        console.log(err)
    }
}

export async function DELETE(req) {
    const tableName = 'CamperActivities'
    try {
        const {activityId} =await req.json();
        const paramsDynamo = {
            TableName: tableName,
            Key:{
                activityId: activityId
            }
        }
        const deleteDynamo = await dynamodb.delete(paramsDynamo).promise();
        console.log("DeleteDynamo", deleteDynamo);
        return NextResponse.json("delete success: " + activityId)
    } catch (err) {
        console.log(err.__type)
    }
} 
