// useS3.ts
import AWS from 'aws-sdk';

const iTryS3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

console.log("process.env.REGION", process.env.REGION)

export default iTryS3;