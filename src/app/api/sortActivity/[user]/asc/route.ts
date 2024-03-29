// sort by open date
// dynamodb.js
import AWS from "aws-sdk";
import iTryDynamoDB from "../../../utils/dynamoDB";
import { TypeActivity } from "@/app/components/ManageActivityPage/activity";
import { RoleUser } from "@/app/api/users/route";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getActivitiesAsc(typeActivity: TypeActivity, page: number, limit: number) {
  //start
  const offset = page ? (page - 1) * limit : 0;
  const session = await getServerSession(authOptions)

  const tableName =
    typeActivity == "staff" ? "StaffActivities" : "CamperActivities";
  let paramsDB: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
  };

  const userRole = session?.user?.role || "outsider"

  if (!(userRole === "admin")) {
    paramsDB = {
      ...paramsDB,
      FilterExpression: "visibility = :roleUser OR visibility = :all",
      ExpressionAttributeValues: {
        ":roleUser": userRole,
        ":all": "all",
      },
    }
  }

  try {
    const data = await iTryDynamoDB.scan(paramsDB).promise();
    const items = data.Items || [];
    // Sort the data by date ascending
    const sortedData = items.sort(
      (a, b) => new Date(a.openDate).getTime() - new Date(b.openDate).getTime()
    );
    const newData = sortedData.slice(offset, offset + limit)

    return { data: newData, status: "success", countActivities: sortedData?.length };
  } catch (error) {
    throw error
  }
}
