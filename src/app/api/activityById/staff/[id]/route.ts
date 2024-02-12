import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import iTryDynamoDB from "@/app/api/utils/dynamoDB";

export async function GET(res: NextApiRequest, { params }: any) {
  const { id } = params;
  console.log("id", id);
  const paramsDynamo = {
    TableName: "StaffActivities",
    Key: {
      activityId: id,
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
