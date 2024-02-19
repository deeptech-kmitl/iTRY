import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import iTryDynamoDB from "@/app/api/utils/dynamoDB";

export async function GET(activityId: string) {
  const paramsDynamo = {
    TableName: "StaffActivities",
    Key: {
      activityId: activityId,
    },
  };
  try{
    const result = await iTryDynamoDB.get(paramsDynamo).promise();
    console.log("result", result);
    return NextResponse.json(result);

  }catch(error){
    console.error("Error:", error);
    return NextResponse.json({ error });
  }
}

export { GET as getStaffActivity }
