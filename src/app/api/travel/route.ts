import { NextRequest, NextResponse } from 'next/server';
import { DynamoDB } from 'aws-sdk';
import iTryDynamoDB from '../utils/dynamoDB';

const tableName = 'Route';

export async function updateTravel(req: NextRequest){
    try{
        const {
            routeId,
            description
        } = await req.json();

        let updateExpression = 'set description = :newDescription';
        let expressionAttributeValue = {
            ':newDescription': description
        };
        const paramsDynamo = {
            TableName: tableName,
            Key:{
                routeId: routeId
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValue,
            ReturnValues: "UPDATED_NEW"
        }

        const updateDynamo = await iTryDynamoDB.update(paramsDynamo).promise();
        return NextResponse.json("update success")
    }catch(error){
        console.log(error)
    }
}
