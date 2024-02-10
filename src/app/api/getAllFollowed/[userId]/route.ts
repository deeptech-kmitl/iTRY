import { NextResponse, NextRequest } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import next from "next";

const dynamodb = new DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

export async function GET(res: NextResponse, { params }: any) {

    const {userId} = params;
    console.log("userId", userId);
    const paramsDB = {
    TableName: "Users",
    Key: {
      userId: userId,
    }
  };

  try {
    const data = await dynamodb.get(paramsDB).promise();
    console.log("data", data);
    if (!data.Item) {
      return NextResponse.json({ error: 'Item not found' });
    }
    return NextResponse.json(data.Item.followedActivityId);
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json({ error });
  }
 return NextResponse.json({ message: userId});
}
