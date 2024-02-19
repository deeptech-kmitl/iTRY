import { NextResponse } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { position, faq, schedule } from "../staffActivity/mockupData";
import iTryS3 from "../../utils/s3DB";
import iTryDynamoDB from "../../utils/dynamoDB";

export async function uploadFileToS3(file: Buffer) {
  try {
    // Extract the image data from the request body
    console.log("file-----", file);
    const imageData = file;

    // Specify the S3 bucket and key for the new image
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: `${Date.now()}.png`, // Example: Use timestamp as part of the key
      Body: imageData,
      ContentType: "image/png",
    };

    // Upload the image to S3
    const uploadResult = await iTryS3
      .upload(params as AWS.S3.PutObjectRequest)
      .promise();

    // Respond with the S3 URL of the uploaded image
    console.log("uploadResult", uploadResult.Location);
    NextResponse.json({ url: uploadResult.Location });
    return uploadResult.Location;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    NextResponse.json({ error });
  }
}

export async function POST(request: any) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }
    // S3
    const buffer = Buffer.from(await file.arrayBuffer());
    const responseS3 = await uploadFileToS3(buffer);
    console.log("yayy");

    //dynamodb
    let myuuid = uuidv4();
    const paramsDynamo = {
      TableName: "StaffActivities",
      Item: {
        activityId: myuuid,
        activityName: formData.get("activityName"),
        imageUrl: responseS3, // url image in S3
        openDate: formData.get("openDate"),
        closeDate: formData.get("closeDate"),
        activityDetailss: formData.get("activityDetailss"),
        visibility: formData.get("visibility"),
        jobPositions: position,
        schedule: schedule,
        phoneNumber: formData.get("phoneNumber"),
        email: formData.get("email"),
        applyLink: formData.get("applyLink"),
        faq: faq,
      },
    };
    // Insert data into DynamoDB
    const insertDynamo = await iTryDynamoDB.put(paramsDynamo).promise();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

