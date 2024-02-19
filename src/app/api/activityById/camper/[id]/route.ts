import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import iTryDynamoDB from "@/app/api/utils/dynamoDB";

export async function getCamperActivity(activityId: string) {
  const paramsDynamo = {
    TableName: "CamperActivities",
    Key: {
      activityId: activityId,
    },
  };
  try {
    const result = await iTryDynamoDB.get(paramsDynamo).promise();
    NextResponse.json({ activity: result.Item });
    return result.Item
  } catch (error) {
    console.error("Error:", error);
    throw error
  }
}
