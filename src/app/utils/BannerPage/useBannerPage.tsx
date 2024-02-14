'use client'

import { uploadFileToS3 } from "@/app/api/create/staffActivity/route";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { v4 as uuidv4 } from 'uuid';
import iTryDynamoDB from "@/app/api/utils/dynamoDB";

export default function useBannerPage() {
    const schema = yup.object().shape({
        image: yup.mixed(),
    });

    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            const image = data.image;
            const imageUrl: any = await uploadFileToS3(image); // อัปโหลดภาพไปยัง Amazon S3 และรับ URL กลับมา
    
            const bannerId = uuidv4(); // สร้าง UUID สำหรับ bannerId
    
            // สร้าง object ข้อมูลที่จะเขียนลงใน DynamoDB
            const dynamoData = {
                bannerId: bannerId,
                bannerUrl: imageUrl
            };
    
            // ส่งข้อมูลไปยัง DynamoDB
            const params = {
                TableName: "Banner",
                Item: dynamoData
            };
    
            await iTryDynamoDB.put(params).promise(); // ส่งข้อมูลไปยัง DynamoDB และรอการเสร็จสิ้น
    
            console.log("Data saved to DynamoDB successfully");
        } catch (error) {
            console.error("Error saving data to DynamoDB:", error);
        }
    }

    const deleteBanner = async (bannerId: string) => {
        try {
            // สร้างพารามิเตอร์สำหรับลบข้อมูลจาก DynamoDB
            const params = {
                TableName: "Banner",
                Key: {
                    bannerId: bannerId
                }
            };
    
            // ลบข้อมูล banner จาก DynamoDB
            await iTryDynamoDB.delete(params).promise();
    
            console.log(`Banner with ID ${bannerId} deleted successfully`);
        } catch (error) {
            console.error("Error deleting banner:", error);
        }
    }
    
    return {register, setValue, watch, handleSubmit, onSubmit, deleteBanner}
}