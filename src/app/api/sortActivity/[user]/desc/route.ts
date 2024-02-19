// sort by open date
import { NextResponse, NextRequest } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import next from "next";
import iTryDynamoDB from "../../../utils/dynamoDB";
import { TypeActivity } from "@/app/components/ManageActivityPage/activity";

export async function getActivitiesDesc(typeActivity: TypeActivity, page: number, limit: number) {
  //   console.log("backend--------", req);
  //start
  const offset = page ? (page - 1) * limit : 0;

  const tableName =
    typeActivity == "staff" ? "StaffActivities" : "CamperActivities";
//   console.log("user", user);
  const paramsDB: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName
  };

  try {
    const data = await iTryDynamoDB.scan(paramsDB).promise();
    const items = data.Items || [];
    // Sort the data by date ascending
    const sortedData = items.sort(
      (a, b) => new Date(b.openDate).getTime() - new Date(a.openDate).getTime()
    );
    const newData = sortedData.slice(offset, offset + limit)

    return { data: newData, status: "success", countActivities: sortedData?.length };
  } catch (error) {
    throw error
  }
}
