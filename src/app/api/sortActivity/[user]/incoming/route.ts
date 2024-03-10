// dynamodb.js
import { NextResponse, NextRequest } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import iTryDynamoDB from "../../../utils/dynamoDB";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getIncomingActivity() {
  const tableName = "CamperActivities"

  const session = await getServerSession(authOptions)

  const paramsDB: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
    FilterExpression: "#openDate > :today AND (visibility = :roleUser OR visibility = :all)",
    ExpressionAttributeNames: {
      "#openDate": "openDate",
    },
    ExpressionAttributeValues: {
      ":today": new Date().toISOString().slice(0, 10),
      ":roleUser": session?.user?.role || "",
      ":all": "all",
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
