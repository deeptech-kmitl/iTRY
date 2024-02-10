import { NextResponse, NextRequest } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import iTryDynamoDB from "../utils/dynamoDB";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId, activityId } = await req.json();
    console.log("userId:", userId, "activity:", activityId);

    const paramsDynamo = {
      TableName: "Users",
      Key: {
        userId: userId,
      },
      UpdateExpression:
        "SET #followedActivityId = list_append(if_not_exists(#followedActivityId, :emptyList), :newValue)",
      ExpressionAttributeNames: {
        "#followedActivityId": "followedActivityId",
      },
      ExpressionAttributeValues: {
        ":newValue": [activityId],
        ":emptyList": [],
      },
      ReturnValues: "UPDATED_NEW",
    };

    //add activity into DynamoDB
    const data = await iTryDynamoDB.update(paramsDynamo).promise();
    return NextResponse.json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Unable to update item:", error);
    return NextResponse.json({ error });
  }
}
