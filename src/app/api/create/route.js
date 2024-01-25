import { NextResponse } from "next/server";
import AWS, { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB.DocumentClient({
	asscessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.REGION,
});

const s3 = new AWS.S3({
	asscessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.REGION,
});


async function uploadFileToS3(file, fileName) {
	try {
		// Extract the image data from the request body
		console.log("file-----", file);
		const imageData = file;

		// Specify the S3 bucket and key for the new image
		const params = {
			Bucket: process.env.BUCKET_NAME,
			Key: `${Date.now()}.png`, // Example: Use timestamp as part of the key
			Body: imageData,
			ContentType: 'image/png',
		};

		// Upload the image to S3
		const uploadResult = await s3.upload(params).promise();

		//dynamodb
		const paramsDynamo = {
			TableName: 'Users',
			Item: {
				userId: "1234",
				email: "chompoo@gmail.com",
				password: "555555666",
				imageUrl: uploadResult.Location, // url image in S3
			},
		};
		// Insert data into DynamoDB
		const insertDynamo = await dynamodb.put(paramsDynamo).promise();
		console.log("insertDynamo", insertDynamo);

		// Respond with the S3 URL of the uploaded image
		console.log("uploadResult", uploadResult.Location);
		NextResponse.json({ url: uploadResult.Location });
	} catch (error) {
		console.error('Error uploading image to S3:', error);
		NextResponse.json({ error });
	}
}

export async function POST(request) {
	try {

		const formData = await request.formData();
		const file = formData.get("file");

		if (!file) {
			return NextResponse.json({ error: "File is required." }, { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const fileName = await uploadFileToS3(buffer, file.name);
		console.log("yayy");
		return NextResponse.json({ success: true, fileName });
	} catch (error) {
		return NextResponse.json({ error });
	}
}