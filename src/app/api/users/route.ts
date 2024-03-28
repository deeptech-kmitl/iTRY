import { GoogleProfile } from "next-auth/providers/google";
import iTryDynamoDB from "../utils/dynamoDB";
import { v4 as uuidv4 } from "uuid";
import { FacebookProfile } from "next-auth/providers/facebook";
import { User } from "next-auth";
import bcrypt from 'bcryptjs';

export type RoleUser = "insider" | "outsider" | "admin"

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt with cost factor 10
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

export async function regiserNewUser(userData: RegisterUser) {
  try {
    const { email, username, password } = userData
    //dynamodb
    let myuuid = uuidv4();
    const roleUser: RoleUser = email.includes("@kmitl.ac.th") ? "insider" : "outsider"
    const addUser: User = {
      id: myuuid,
      role: roleUser,
      email: email,
      name: username,
      notifications: [],
      activitiesFollow: [],
      receiveEmail: false,
    }
    const paramsDynamo = {
      TableName: "Users",
      Item: {
        ...addUser,
        password: await hashPassword(password)
      }
    };
    // Insert data into DynamoDB
    await iTryDynamoDB.put(paramsDynamo).promise();
    return {
      status: "success"
    }
  } catch (error) {
    console.log(error)
    // return NextResponse.json({ error });
    throw error;
  }
}

export async function createUser(userData: GoogleProfile | FacebookProfile) {
  try {
    const { email, name } = userData
    //dynamodb
    let myuuid = uuidv4();
    const roleUser: RoleUser = email.includes("@kmitl.ac.th") ? "insider" : "outsider"
    const addUser: User = {
      id: myuuid,
      role: roleUser,
      email: email,
      name: name,
      notifications: [],
      activitiesFollow: [],
      receiveEmail: false,

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
    return {
      data: result?.Items, // Assuming multiple items with the same email
      status: "success",
    };
  } catch (error) {
    console.error("Error:", error);
    throw error
  }
}