import iTryDynamoDB from "@/app/api/utils/dynamoDB";

export async function getCamperActivity(activityId: string) {
  const paramsDynamo = {
    TableName: "CamperActivities",
    Key: {
      activityId: activityId,
    },
  };
  try {
    const result = await iTryDynamoDB.get(paramsDynamo).promise();
    return result.Item
  } catch (error) {
    console.error("Error:", error);
    throw error
  }
}
