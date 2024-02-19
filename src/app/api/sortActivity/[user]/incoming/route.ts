// dynamodb.js
import { NextResponse, NextRequest } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import iTryDynamoDB from "../../../utils/dynamoDB";

export async function getIncomingActivity() {
  const tableName = "CamperActivities"

  console.log("today", new Date().toISOString().slice(0, 10))

  const paramsDB: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
    FilterExpression: "#openDate > :today",
    ExpressionAttributeNames: {
      "#openDate": "openDate",
    },
    ExpressionAttributeValues: {
      ":today": new Date().toISOString().slice(0, 10),
    },
  };

  try {
    const data = await iTryDynamoDB.scan(paramsDB).promise();
    const items = data.Items || [];
    // Sort the data by date ascending
    const sortedData = items.sort(
      (a, b) => new Date(a.openDate).getTime() - new Date(b.openDate).getTime()
    );
    
    console.log("sortedData", sortedData)

    return { data: sortedData[0], status: "success" };
  } catch (error) {
    console.error("Error:", error);
    throw error
  }
}
