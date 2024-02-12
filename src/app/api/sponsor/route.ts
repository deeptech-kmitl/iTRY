import { NextRequest, NextResponse } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import iTryS3 from "../utils/s3DB";
import iTryDynamoDB from "../utils/dynamoDB";
import { uploadFileToS3 } from "../create/staffActivity/route";

export async function POST(request: any) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }
    // S3
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer);
    console.log("filename");

    //dynamodb
    let myuuid = uuidv4();
    const paramsDynamo = {
      TableName: "Sponsor",
      Item: {
        sponsorId: myuuid,
        sponsorUrl: fileName,
      },
    };
    // Insert data into DynamoDB
    const insertDynamo = await iTryDynamoDB.put(paramsDynamo).promise();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function GET(request: any) {
  const paramsDynamo = {
    TableName: "Sponsor",
  };
  try {
    const getDynamo = await iTryDynamoDB.scan(paramsDynamo).promise();
    return NextResponse.json({ data: getDynamo.Items });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const params = url.searchParams.get('sponsorId');
    console.log(params);
    const sponsorId = params;
    console.log(sponsorId);
    const paramsDynamo = {
      TableName: "Sponsor",
      Key: {
        sponsorId: sponsorId,
      },
    };
    const deleteDynamo = await iTryDynamoDB.delete(paramsDynamo).promise();
    return NextResponse.json(`Delete " ${sponsorId} " Success`)
  } catch (error) {
    console.log(error)
    return NextResponse.json({error})
  }
}