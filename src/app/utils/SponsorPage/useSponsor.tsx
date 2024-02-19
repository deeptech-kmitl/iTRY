"use client"

import { uploadFileToS3 } from "@/app/api/create/staffActivity/route"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { v4 as uuidv4 } from "uuid"
import iTryDynamoDB from "@/app/api/utils/dynamoDB"

export default function useSponsor() {
    const schema = yup.object().shape({
        image: yup.mixed()
    });

    const { register, setValue, watch, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {
        try {
            const image = data.image;
            const imageUrl: any = await uploadFileToS3(image);

            const sponsorId = uuidv4();

            const dynamoData = {
                sponsorId: sponsorId,
                sponsorUrl: imageUrl
            };

            const params = {
                TableName: "Sponsor",
                Item: dynamoData
            };

            await iTryDynamoDB.put(params).promise();
            console.log("Data saved to DynamoDB successfully");
        }
        catch(error) {
            console.error("Error saving data to DynamoDB:", error);
        }
    }

    const onDelete = async (sponsorId:string) => {
        try {
            const params = {
                TableName: "Sponsor",
                Key: {
                    sponsorId: sponsorId
                }
            }

            await iTryDynamoDB.delete(params).promise();
            console.log(`${sponsorId} deleted success`)
        }
        catch(error) {
            console.error("Error deleting sponsor:", error);
        }
    }

    return {register, setValue, watch, handleSubmit, onSubmit, onDelete}
}