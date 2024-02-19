// useS3.ts
import { DynamoDB } from 'aws-sdk';

const iTryDynamoDB = new DynamoDB.DocumentClient({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION || process.env.REGION,
});

console.log("REGION,", process.env.NEXT_PUBLIC_REGION || process.env.REGION)

export default iTryDynamoDB;