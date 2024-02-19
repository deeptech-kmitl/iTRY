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
      name: name,
      notifications: [],
      activitiesFollow: []
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
    throw error;
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
    console.log("user from db", result?.Items?.[0])
    return {
      data: result?.Items?.[0], // Assuming multiple items with the same email
      status: "success",
    };
  } catch (error) {
    throw error
  }
}

export async function getAllUser() {

  const paramsDynamo = {
    TableName: "Users",
  };

  try {
    const result = await iTryDynamoDB.scan(paramsDynamo).promise();
    console.log("result", result)
    return {
      data: result?.Items, // Assuming multiple items with the same email
      status: "success",
    };
  } catch (error) {
    console.error("Error:", error);
    throw error
  }
}