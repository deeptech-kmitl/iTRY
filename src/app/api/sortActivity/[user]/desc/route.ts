// sort by open date
import { NextResponse, NextRequest } from "next/server";
import AWS, { DynamoDB } from "aws-sdk";
import next from "next";
import iTryDynamoDB from "../../../utils/dynamoDB";

export async function GET(req: any) {
  //   console.log("backend--------", req);
  const { user, page } = req;
  console.log("user-------", user, page);
  //start
  const offset = page ? (parseInt(page) - 1) * 10 : 0;
  console.log("page", page, offset);

  const tableName =
    user == "staff" ? "StaffActivities" : "CamperActivities";
//   console.log("user", user);
  const paramsDB: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
  };

  try {
    const data = await iTryDynamoDB.scan(paramsDB).promise();
    const items = data.Items || [];
    // Sort the data by date ascending
    const sortedData = items.sort(
      (a, b) => new Date(b.openDate).getTime() - new Date(a.openDate).getTime()
    );
    console.log("data", data);
    console.log("count----", sortedData.slice(offset, offset + 10).length);

    // return NextResponse.json({ data: sortedData.slice(offset, offset + 10) });
    return { data: sortedData.slice(offset, offset + 10) };
  } catch (error) {
    console.error("Error:", error);
    // return NextResponse.json({ error: error });
    return { error: error };
  }
}

export { GET as getActivitiesDesc };
