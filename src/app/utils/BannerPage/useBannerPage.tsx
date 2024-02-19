'use client'

import { uploadFileToS3 } from "@/app/api/create/staffActivity/route";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { creatBanner, deleteBanner } from "@/app/api/banner/route";
import { useRouter } from "next/navigation";
import ITryToastNotification from "@/app/components/Toast/ToastNotification";

export default function useBannerPage() {
    const schema = yup.object().shape({
        image: yup.mixed(),
    });

    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const router = useRouter()

    const onSubmit = async (data: any) => {
        try {
            const image = data.image;
            const imageUrl: any = await uploadFileToS3(image); // อัปโหลดภาพไปยัง Amazon S3 และรับ URL กลับมา
    
            const result = await creatBanner({ bannerUrl: imageUrl });
            

            await ITryToastNotification({
                type: "success",
                text: "เพิ่มแบนเนอร์สำเร็จ"
            })
    
            console.log("Data saved to DynamoDB successfully result:", result);
        } catch (error) {
            console.error("Error saving data to DynamoDB:", error);
        }
    }

    const onDelete = async (bannerId: string) => {
        try {
            const result = await deleteBanner(bannerId);

            ITryToastNotification({
                type: "success",
                text: "ลบแบนเนอร์สำเร็จ"
            })
    
            console.log(`Banner with ID ${bannerId} deleted successfully result:`, result);
        } catch (error) {
            console.error("Error deleting banner:", error);
        }
    }
    
    return { register, setValue, watch, handleSubmit, onSubmit, onDelete }
}