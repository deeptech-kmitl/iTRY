import { GoogleProfile } from "next-auth/providers/google";
import iTryDynamoDB from "../utils/dynamoDB";
import { v4 as uuidv4 } from "uuid";
import { FacebookProfile } from "next-auth/providers/facebook";
import { User } from "next-auth";

export async function createUser(userData: GoogleProfile | FacebookProfile) {
  try {
    const { email, name } = userData
    //dynamodb
    let myuuid = uuidv4();
    const roleUser = email.includes("@kmitl.ac.th") ? "insider" : "outsider"
    const addUser: User = {
      id: myuuid,
      role: roleUser,
      email: email,
      name: name
    }
    const paramsDynamo = {
      TableName: "Users",
      Item: addUser
    };
    // Insert data into DynamoDB
    await iTryDynamoDB.put(paramsDynamo).promise();
    return {
      data: addUser,
      status: "success"
    }
  } catch (error) {
    console.log(error)
    // return NextResponse.json({ error });
    return {
      status: "error",
      error: error
    }
  }
}

export async function findUser(email: string) {

  const paramsDynamo = {
    TableName: "Users",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  try {
    const result = await iTryDynamoDB.scan(paramsDynamo).promise();
    return {
      data: result?.Items?.[0], // Assuming multiple items with the same email
      status: "success",
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: "error",
      error: error,
    };
  }
}