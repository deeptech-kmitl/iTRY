import { NextResponse } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { position, faq, schedule } from "../staffActivity/mockupData";

const dynamodb = new DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

async function uploadFileToS3(file: Buffer, fileName: string) {
  try {
    // Extract the image data from the request body
    console.log("file-----", file);
    const imageData = file;

    // Specify the S3 bucket and key for the new image
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${Date.now()}.png`, // Example: Use timestamp as part of the key
      Body: imageData,
      ContentType: "image/png",
    };

    // Upload the image to S3
    const uploadResult = await s3
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
    const responseS3 = await uploadFileToS3(buffer, file.name);
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
        activityDetails: formData.get("activityDetails"),
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
    const insertDynamo = await dynamodb.put(paramsDynamo).promise();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
