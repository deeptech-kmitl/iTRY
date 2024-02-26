import iTryS3 from './../utils/s3DB';

export async function uploadFileToS3(file: Buffer) {
  try {
    // Extract the image data from the request body
    const imageData = file;

    // Specify the S3 bucket and key for the new image
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: `${Date.now()}.png`, // Example: Use timestamp as part of the key
      Body: imageData,
      ContentType: "image/png",
    };

    // Upload the image to S3
    const uploadResult = await iTryS3
      .upload(params as AWS.S3.PutObjectRequest)
      .promise();

    // Respond with the S3 URL of the uploaded image
    return uploadResult.Location;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error
  }
}