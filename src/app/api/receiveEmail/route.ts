import iTryDynamoDB from "../utils/dynamoDB";

export async function updateReceiveEmail(userId: string, email:string, newReceiveEmail: boolean) {
  try {

    // Append the new activity to the activitiesFollow array
    const paramsDynamo = {
      TableName: "Users",
      Key: {
        id: userId,
        email: email,
      },
      UpdateExpression: "SET receiveEmail = :newReceiveEmail",
      ExpressionAttributeValues: {
        ":newReceiveEmail": newReceiveEmail,
      },
      ReturnValues: "UPDATED_NEW",
    };

    // Add activity into DynamoDB
    const response = await iTryDynamoDB.update(paramsDynamo).promise();
    return {
      status: "success",
    };
  } catch (error) {
    console.error("Unable to update item:", error);
    throw error;
  }
}
