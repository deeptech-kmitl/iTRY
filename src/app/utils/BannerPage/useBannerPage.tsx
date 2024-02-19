'use client'

import { uploadFileToS3 } from "@/app/api/create/staffActivity/route";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { createBanner, deleteBanner } from "@/app/api/banner/route";
import { useRouter } from "next/navigation";
import ITryToastNotification from "@/app/components/Toast/ToastNotification";
import { mutate } from "swr";

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
            const bannerUrl: any = await uploadFileToS3(image); // อัปโหลดภาพไปยัง Amazon S3 และรับ URL กลับมา
    
            const result = await createBanner(bannerUrl);
            

            await ITryToastNotification({
                type: "success",
                text: "เพิ่มแบนเนอร์สำเร็จ"
            })

            mutate('getBanner');

            setValue("image", undefined)
    
            console.log("Data saved to DynamoDB successfully result:", result);
        } catch (error) {
            await ITryToastNotification({
                type: "error",
                text: "เพิ่มแบนเนอร์ล้มเหลว"
            })
            console.error("Error saving data to DynamoDB:", error);
        }
    }

    const onDeleteBanner = async (bannerId: string) => {
        try {
            const result = await deleteBanner(bannerId);

            await ITryToastNotification({
                type: "success",
                text: "ลบแบนเนอร์สำเร็จ"
            })
    
            mutate('getBanner');

            console.log(`Banner with ID ${bannerId} deleted successfully result:`, result);
        } catch (error) {
            await ITryToastNotification({
                type: "error",
                text: "ลบแบนเนอร์ล้มเหลว"
            })
            console.log("Error deleting banner:", error);
        }
    }
    
    return { register, setValue, watch, handleSubmit, onSubmit, onDeleteBanner }
}