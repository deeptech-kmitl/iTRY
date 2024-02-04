import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

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
    const result = await dynamodb.get(paramsDynamo).promise();
    console.log("result", result);
    return NextResponse.json(result);

  }catch(error){
    console.error("Error:", error);
    return NextResponse.json({ error });
  }
}
