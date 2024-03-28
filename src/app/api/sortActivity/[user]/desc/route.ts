// sort by open date
import AWS from "aws-sdk";
import iTryDynamoDB from "../../../utils/dynamoDB";
import { TypeActivity } from "@/app/components/ManageActivityPage/activity";
import { RoleUser } from "@/app/api/users/route";
import { auth, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getActivitiesDesc(typeActivity: TypeActivity, page: number, limit: number) {
  const session = await getServerSession(authOptions)
  //start
  const offset = page ? (page - 1) * limit : 0;

  const tableName =
    typeActivity == "staff" ? "StaffActivities" : "CamperActivities";
  let paramsDB: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
  };

  if (!(session?.user?.role === "admin")) {
    paramsDB = {
      ...paramsDB,
      FilterExpression: "visibility = :roleUser OR visibility = :all OR visibility = :outsider",
      ExpressionAttributeValues: {
        ":roleUser": session?.user?.role || "",
        ":all": "all",
        ":outsider": "outsider",
      },
    }
  }

  try {
    const data = await iTryDynamoDB.scan(paramsDB).promise();
    const items = data.Items || [];
    // Sort the data by date ascending
    const sortedData = items.sort(
      (a, b) => new Date(b.openDate).getTime() - new Date(a.openDate).getTime()
    );
    const newData = sortedData.slice(offset, offset + limit)

    return { data: newData, status: "success", countActivities: sortedData?.length };
  } catch (error) {
    throw error
  }
}
