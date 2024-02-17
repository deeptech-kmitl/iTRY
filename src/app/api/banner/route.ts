import { NextRequest, NextResponse } from "next/server";
import iTryDynamoDB from "../utils/dynamoDB";
import { uploadFileToS3 } from "../create/staffActivity/route";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
    try {
      const result = await iTryDynamoDB.scan({
        TableName: "Banner",
      }).promise();
      
      console.log("Result:", result.Items);
      return {data : result.Items, status:"success"};
    } catch (error) {
      console.error("Error:", error); 
      return { error: error, status:"error" };
    }
  }
  
  export async function POST(request: any) {
    try {
      const {bannerUrl} = request;
  
      if (!bannerUrl) {
        return NextResponse.json({ error: "File is required." }, { status: 400 });
      }

      //dynamodb
      let bannerId = uuidv4();
      const paramsDynamo = {
        TableName: "Banner",
        Item: {
          bannerId: bannerId,
          bannerUrl: bannerUrl,
        },
      };
      // Insert data into DynamoDB
      await iTryDynamoDB.put(paramsDynamo).promise();
      // return NextResponse.json({ success: true });
      return {
        // data: [insertDynamo],
        status: "success"
        }
    } catch (error) {
      console.log(error);
      // return NextResponse.json({ error });
      return {
        status:"error",
        error: error
        }
    }
  }
  
  export async function DELETE(bannerId: string) {
    try {
        // สร้างพารามิเตอร์สำหรับลบข้อมูลจาก DynamoDB
        const params = {
            TableName: "Banner",
            Key: {
                bannerId: bannerId
            }
        };

        // ลบข้อมูล banner จาก DynamoDB
        await iTryDynamoDB.delete(params).promise();
      // return NextResponse.json(`Delete " ${bannerId} " Success`)
      return {
        // data: [deleteDynamo],
        status: "success"
        }
    } catch (error) {
      console.log(error)
      // return NextResponse.json({error})
      return {
        status:"error",
        error: error
        }
    }
  }
  export { GET as getBanner, POST as creatBanner, DELETE as deleteBanner }
