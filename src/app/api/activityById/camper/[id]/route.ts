import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import iTryDynamoDB from "@/app/api/utils/dynamoDB";

export async function GET(___: any, {params}: any) {
  const { id } = params;
  console.log("id", id);
  const paramsDynamo = {
    TableName: "CamperActivities",
    Key: {
      activityId: id,
    },
  };
  try {
    const result = await iTryDynamoDB.get(paramsDynamo).promise();
    NextResponse.json({ activity: result.Item });
    return result.Item
  } catch (error) {
    console.error("Error:", error);
    return {error: error}
    return NextResponse.json({ error });
  }
}

export {GET as getCamperActivity}