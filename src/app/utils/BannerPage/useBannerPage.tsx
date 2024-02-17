'use client'

import { uploadFileToS3 } from "@/app/api/create/staffActivity/route";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { creatBanner, deleteBanner } from "@/app/api/banner/route";

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
    
            const result = await creatBanner({bannerUrl: imageUrl});
    
            console.log("Data saved to DynamoDB successfully result:", result);
        } catch (error) {
            console.error("Error saving data to DynamoDB:", error);
        }
    }

    const deleted = async (bannerId: string) => {
        try {
            const result = await deleteBanner(bannerId);
    
            console.log(`Banner with ID ${bannerId} deleted successfully result:`, result);
        } catch (error) {
            console.error("Error deleting banner:", error);
        }
    }
    
    return {register, setValue, watch, handleSubmit, onSubmit, deleted}
}