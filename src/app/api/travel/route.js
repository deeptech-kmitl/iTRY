import { NextResponse } from 'next/server';
import { DynamoDB } from 'aws-sdk';

const tableName = 'Route';

const dynamodb = new DynamoDB.DocumentClient({
    asscessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
});

export async function PUT(req){
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

        const updateDynamo = await dynamodb.update(paramsDynamo).promise();
        return NextResponse.json("update success")
    }catch(error){
        console.log(error)
    }
}
