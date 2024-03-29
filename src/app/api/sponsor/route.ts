import { v4 as uuidv4 } from "uuid";
import iTryDynamoDB from "../utils/dynamoDB";

export async function createSponSor(sponsorUrl: string) {
  try {

    if(!sponsorUrl) {
      throw new Error("No image selected")
    }

    //dynamodb
    let myuuid = uuidv4();

    const paramsDynamo = {
      TableName: "Sponsor",
      Item: {
        sponsorId: myuuid,
        sponsorUrl: sponsorUrl,
      },
    };
    // Insert data into DynamoDB
    const insertDynamo = await iTryDynamoDB.put(paramsDynamo).promise();
    return {
      status: "success"
      }
  } catch (error) {
    console.log(error)
    // return NextResponse.json({ error });
    throw error
  }
}

export async function getSponSors() {
  const paramsDynamo = {
    TableName: "Sponsor",
  };
  try {
    const getDynamo = await iTryDynamoDB.scan(paramsDynamo).promise();
    return {
      data: getDynamo.Items,
      status: "success"
      }
  } catch (error) {
    console.log(error)
    // return NextResponse.json({ error });
    throw error
  }
}

export async function deleteSponSor(sponsorId: string) {
  try {
    const paramsDynamo = {
      TableName: "Sponsor",
      Key: {
        sponsorId: sponsorId,
      },
    };
    const deleteDynamo = await iTryDynamoDB.delete(paramsDynamo).promise();
    return {
      status: "success"
      }
  } catch (error) {
    console.log(error)
    // return NextResponse.json({ error });
    throw error
  }
}