import iTryDynamoDB from "@/app/api/utils/dynamoDB";

export async function getStaffActivity(activityId: string) {
  const paramsDynamo = {
    TableName: "StaffActivities",
    Key: {
      activityId: activityId,
    },
  };
  try{
    const result = await iTryDynamoDB.get(paramsDynamo).promise();
    return result.Item

  }catch(error){
    throw error;
  }
}