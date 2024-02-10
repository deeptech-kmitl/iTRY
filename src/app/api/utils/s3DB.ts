import { useEffect, useRef } from 'react';
import AWS from 'aws-sdk';

let s3Client: AWS.S3 | null = null;

const useS3 = () => {
  const s3Ref = useRef<AWS.S3 | null>(null);

  useEffect(() => {
    if (!s3Client) {
      s3Client = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.REGION,
      });
    }
    s3Ref.current = s3Client;
  }, []);

  return s3Ref.current as AWS.S3;
};

export default useS3;