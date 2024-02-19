import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import AWS, { DynamoDB } from "aws-sdk";
import { table } from "console";
import iTryDynamoDB from "../../utils/dynamoDB";

export async function GET(res: NextApiRequest, { params }: any) {
  const obj = params;
  const tableName =
    obj.user == "staff" ? "StaffActivities" : "CamperActivities";
  console.log("user", obj.user);
  const paramsDB: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
  };

  try {
    const data = await iTryDynamoDB.scan(paramsDB).promise();
    console.log("data", data);
    // return NextResponse.json(data);
    return { data: data.Items || [] };
  } catch (error) {
    console.error("Error:", error);
    throw error
  }
}
