import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import AWS, { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

export async function GET(res: NextApiRequest, { params }: any) {
  const obj = params;
  const tableName =
    obj.user == "staff" ? "StaffActivities" : "CamperActivities";
  console.log("user", obj.user);
  const paramsDB: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
  };

  try {
    const data = await dynamodb.scan(paramsDB).promise();
    console.log("data", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json({ error });
  }
}
