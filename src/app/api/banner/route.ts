import iTryDynamoDB from "../utils/dynamoDB";
import { v4 as uuidv4 } from "uuid";

export async function getBanner() {
    try {
      const result = await iTryDynamoDB.scan({
        TableName: "Banner",
      }).promise();
      
      return {data : result.Items, status:"success"};
    } catch (error) {
      console.error("Error:", error); 
      throw error
    }
  }
  
  export async function createBanner(bannerUrl: string) {
    try {
  
      if (!bannerUrl) {
        throw new Error("No file selected")
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
      throw error
    }
  }
  
  export async function deleteBanner(bannerId: string) {
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
      throw error
    }
  }
