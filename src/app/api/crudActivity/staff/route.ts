import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
const tableName = "StaffActivities";
import iTryDynamoDB from "@/app/api/utils/dynamoDB";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";

export async function POST(req: ITryActivity) {
  try {
    console.log("start upload");
    console.log("req", req);
    const {
      activityName,
      imageUrl,
      visibility,
      activityDetails,
      jobPositions,
      openDate,
      closeDate,
      schedule,
      phone,
      email,
      igLink,
      facebookLink,
      applyLink,
      faq,
    } = req;

    const activityId = await uuidv4();

    const paramsDynamo = {
      TableName: tableName,
      Item: {
        activityId: activityId,
        activityName: activityName,
        imageUrl: imageUrl,
        jobPositions: jobPositions,
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
      },
    };


    const insertDynamo = await iTryDynamoDB.put(paramsDynamo).promise();
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

async function PUT(req: ITryActivity) {
  try {
    const {
      activityId,
      activityName,
      imageUrl,
      visibility,
      activityDetails,
      jobPositions,
      openDate,
      closeDate,
      schedule,
      phone,
      email,
      igLink,
      facebookLink,
      applyLink,
      faq,
    } = req;

    let updateExpression =
      "set imageUrl = :newImageUrl, activityName = :newActivityName, activityDetails = :newActivityDetails, openDate = :newOpenDate, closeDate = :newCloseDate, jobPositions = :newJobPosition ,visibility = :newVisibility, schedule = :newSchedule, phone = :newPhone, email= :newEmail, applyLink= :newApplyLink, igLink = :newIgLink, facebookLink = :newFacebookLink, faq = :newFaq";
    let expressionAttributeValue = {
      ":newImageUrl": imageUrl,
      ":newActivityName": activityName,
      ":newActivityDetails": activityDetails,
      ":newOpenDate": openDate,
      ":newCloseDate": closeDate,
      ":newJobPositions": jobPositions,
      ":newVisibility": visibility,
      ":newSchedule": schedule,
      ":newPhone": phone,
      ":newEmail": email,
      ":newApplyLink": applyLink,
      ":newIgLink": igLink,
      ":newFacebookLink": facebookLink,
      ":newFaq": faq,
    };

    const paramsDynamo = {
      TableName: tableName,
      Key: {
        activityId: activityId,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValue,
      ReturnValues: "UPDATED_NEW",
    };
    const updateDynamo = await iTryDynamoDB.update(paramsDynamo).promise();
    return {
      status: "success"
    }
  } catch (error) {
    return {
      status: "error",
      message: error
  }
  }
  // >>>>> SEND EMAIL TO USER >>>>>
}

export async function DELETE(req: NextRequest) {
  try {
    const { activityId } = await req.json();
    const paramsDynamo = {
      TableName: tableName,
      Key: {
        activityId: activityId,
      },
    };
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

export { PUT as updateStaffActivity };
