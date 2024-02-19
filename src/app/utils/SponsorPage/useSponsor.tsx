"use client"

import { uploadFileToS3 } from "@/app/api/create/staffActivity/route"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import ITryToastNotification from "@/app/components/Toast/ToastNotification"
import { mutate } from "swr"
import { createSponSor, deleteSponSor } from "@/app/api/sponsor/route"

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
            const imageUrl: string = await uploadFileToS3(image) || ""
    
            await createSponSor(imageUrl)
            
            await ITryToastNotification({
                type: "success",
                text: "เพิ่มสปอนเซอร์สำเร็จ"
            })

            setValue("image", undefined)

            mutate('getSponsors');

            console.log("Data saved to DynamoDB successfully");
        }
        catch(error) {
            await ITryToastNotification({
                type: "error",
                text: "เพิ่มสปอนเซอร์ล้มเหลว"
            })
            console.error("Error saving data to DynamoDB:", error);
        }
    }

    const onDelete = async (sponsorId:string) => {
        try {
            
            await deleteSponSor(sponsorId);

            await ITryToastNotification({
                type: "success",
                text: "ลบสปอนเซอร์สำเร็จ"
            })

            mutate('getSponsors');

            console.log(`${sponsorId} deleted success`)
        }
        catch(error) {
            await ITryToastNotification({
                type: "error",
                text: "ลบสปอนเซอร์ล้มเหลว"
            })
            console.error("Error deleting sponsor:", error);
        }
    }

    return {register, setValue, watch, handleSubmit, onSubmit, onDelete}
}