
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import iTryDynamoDB from "../../utils/dynamoDB";
const tableName = 'CamperActivities';


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
        return NextResponse.json("success: " + insertDynamo.activityName)
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function PUT(req) {
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
        const updateDynamo = await iTryDynamoDB.update(paramsDynamo).promise();
        return NextResponse.json("update success: " + activityName)
    }catch(err){
        console.log(err)
    }
}

export async function DELETE(req) {
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
        console.log(err.__type)
    }
} 
