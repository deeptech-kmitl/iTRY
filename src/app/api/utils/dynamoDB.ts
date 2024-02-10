// ITryDynamo.js
import { useEffect, useRef } from 'react';
import { DynamoDB } from 'aws-sdk';

let dynamoDBClient: DynamoDB.DocumentClient | null = null;

const useDynamoDB = () => {
  const dynamoDBRef = useRef<DynamoDB.DocumentClient | null>(null);

  useEffect(() => {
    if (!dynamoDBClient) {
      dynamoDBClient = new DynamoDB.DocumentClient({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.REGION,
      });
    }

    dynamoDBRef.current = dynamoDBClient;
  }, []);

  return dynamoDBRef.current as DynamoDB.DocumentClient;
};

export default useDynamoDB;