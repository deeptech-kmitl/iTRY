import { NextRequest, NextResponse } from "next/server";
import { DynamoDB } from "aws-sdk";
import iTryDynamoDB from "../utils/dynamoDB";

const tableName = "Route";

export async function updateTravel(req: any) {
  try {
    const { data, routeId } = req;
    console.log("req------", req);

    let updateExpression = "set description = :newDescription";
    let expressionAttributeValue = {
      ":newDescription": data.routeDetail,
    };
    const paramsDynamo = {
      TableName: tableName,
      Key: {
        routeId: routeId,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValue,
      ReturnValues: "UPDATED_NEW",
    };

    const updateDynamo = await iTryDynamoDB.update(paramsDynamo).promise();
    return {
      data: updateDynamo,
      status: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      status: error,
    };
  }
}

export async function getTravel() {
  let paramsDB: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: "Route",
  };
  try {
    const data = await iTryDynamoDB.scan(paramsDB).promise();
    const items = data.Items || [];
    console.log("---------------------getTravel jaaa", data.Items);
    return { data: items, status: "success" };
  } catch (error) {
    console.log(error);
  }
}
