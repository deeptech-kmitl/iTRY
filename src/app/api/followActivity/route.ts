"use server"

import iTryDynamoDB from "../utils/dynamoDB";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";

export async function updateFollowActivity(userId: string, email:string, newActivity: ITryActivity[]) {
  try {
    console.log("userId:", userId, "activity:", newActivity);

    // Append the new activity to the activitiesFollow array
    const paramsDynamo = {
      TableName: "Users",
      Key: {
        id: userId,
        email: email,
      },
      UpdateExpression: "SET #activitiesFollow = :newValue",
      ExpressionAttributeNames: {
        "#activitiesFollow": "activitiesFollow",
      },
      ExpressionAttributeValues: {
        ":newValue": newActivity,
      },
      ReturnValues: "UPDATED_NEW",
    };


    // Add activity into DynamoDB
    const response = await iTryDynamoDB.update(paramsDynamo).promise();
    console.log("response", response)
    return {
      status: "success",
    };
  } catch (error) {
    console.error("Unable to update item:", error);
    throw error;
  }
}
