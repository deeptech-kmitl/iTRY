import { Notification } from "@/app/utils/ManageEmail/email";
import iTryDynamoDB from "../utils/dynamoDB";

export async function updateNotification(userId: string, email: string, newNotification: Notification[]) {
    try {
        console.log("userId:", userId, "activity:", newNotification);

        // Append the new activity to the activitiesFollow array
        const paramsDynamo = {
            TableName: "Users",
            Key: {
                id: userId,
                email: email,
            },
            UpdateExpression: "SET #notifications = :newValue",
            ExpressionAttributeNames: {
                "#notifications": "notifications",
            },
            ExpressionAttributeValues: {
                ":newValue": newNotification,
            },
            ReturnValues: "UPDATED_NEW",
        };


        // Add activity into DynamoDB
        const response = await iTryDynamoDB.update(paramsDynamo).promise();
        console.log(email, " >>>> User be send Noti >>>>> ", response.Attributes)
        return {
            status: "success",
        };
    } catch (error) {
        console.error("Unable to update item:", error);
        throw error;
    }
}

