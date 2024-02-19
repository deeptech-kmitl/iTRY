// useS3.ts
import AWS from 'aws-sdk';

const iTryS3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
});

console.log("process.env.NEXT_PUBLIC_REGION,", process.env.NEXT_PUBLIC_REGION)

export default iTryS3;