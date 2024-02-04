import { NextResponse } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

export async function GET() {
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: "StaffActivities",
  };

  try {
    const data = await dynamodb.scan(params).promise();
    console.log("data", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json({ error });
  }
}
