import iTryDynamoDB from "../../utils/dynamoDB";

export async function GET() {
    try {
      const result = await iTryDynamoDB.scan({
        TableName: "Banner",
      }).promise();
      
      console.log("Result:", result.Items);
      return result.Items;
    } catch (error) {
      console.error("Error:", error); 
      return { error: error, status:"error" };
    }
  }
  
  
  export { GET as getBanner }