// useS3.ts
import { DynamoDB } from 'aws-sdk';

const iTryDynamoDB = new DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

console.log("process.env.REGION", process.env.REGION)

export default iTryDynamoDB;