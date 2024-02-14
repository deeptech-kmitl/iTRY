import { NextResponse } from "next/server";
import { uploadFileToS3 } from "../../create/staffActivity/route";
import { v4 as uuidv4 } from "uuid";
import iTryDynamoDB from "../../utils/dynamoDB";

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
        TableName: "Banner",
        Item: {
          bannerId: myuuid,
          bannerUrl: responseS3, // url image in S3
        },
      };
      // Insert data into DynamoDB
      const insertDynamo = await iTryDynamoDB.put(paramsDynamo).promise();
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error });
    }
  }
  