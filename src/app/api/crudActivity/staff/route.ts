import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import iTryDynamoDB from "@/app/api/utils/dynamoDB";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";
import { sendEmailAndNoti } from "../../sendEmail/byEditActivity/route";

const tableName = "StaffActivities";

export async function createStaffActivity(req: ITryActivity) {
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
      faq
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
        typeActivity: "staff"
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

export async function updateStaffActivity(req: ITryActivity) {
  console.log("updateStaffActivity")
  console.log("req", req)
  try {
    const {
      activityId,
      activityName,
      imageUrl,
      visibility,
      activityDetails = null,
      jobPositions = null,
      openDate,
      closeDate,
      schedule = null,
      phone = null,
      email = null,
      igLink = null,
      facebookLink = null,
      applyLink = null,
      faq = null,
      typeActivity
    } = req;

    let updateExpression =
      "set imageUrl = :newImageUrl, activityName = :newActivityName, activityDetails = :newActivityDetails, openDate = :newOpenDate, closeDate = :newCloseDate, jobPositions = :newJobPositions,visibility = :newVisibility, schedule = :newSchedule, phone = :newPhone, email= :newEmail, applyLink= :newApplyLink, igLink = :newIgLink, facebookLink = :newFacebookLink, faq = :newFaq, typeActivity = :typeActivity";
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
      ":typeActivity": typeActivity
    };

    // // >>>>> SEND EMAIL TO USER >>>>>
    // await sendEmailAndNoti(activityId)

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
    throw error
  }
}

export async function deleteStaffActivity(activityId: string) {
  try {
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
    throw error
  }
}
