// sort by open date
// dynamodb.js
import { NextResponse, NextRequest } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import next from "next";
import iTryDynamoDB from "../../../utils/dynamoDB";

export async function GET(res: NextRequest, { params }: any) {
  const obj = params;
  const tableName =
    obj.user == "staff" ? "StaffActivities" : "CamperActivities";
  console.log("user", obj.user);
  const paramsDB: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
  };

  try {
    const data = await iTryDynamoDB.scan(paramsDB).promise();
    const items = data.Items || [];
    // Sort the data by date ascending
    const sortedData = items.sort(
      (a, b) => new Date(a.openDate).getTime() - new Date(b.openDate).getTime()
    );
    console.log("data", data);
    return NextResponse.json({ data: sortedData });
    // return { data: sortedData };
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error });
    // return { error: error };
  }
}
