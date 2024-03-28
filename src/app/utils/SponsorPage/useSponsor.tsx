"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import ITryToastNotification from "@/app/components/Toast/ToastNotification"
import { mutate } from "swr"
import { createSponSor, deleteSponSor } from "@/app/api/sponsor/route"
import { uploadFileToS3 } from "@/app/api/uploadFile/route"
import Swal from "sweetalert2"

export default function useSponsor() {
    const schema = yup.object().shape({
        image: yup.mixed()
    });

    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {
        try {
            const image = data.image;
            const imageUrl: string = await uploadFileToS3(image) || ""

            await createSponSor(imageUrl)

            Swal.fire({
                icon: "success",
                text: "เพิ่มสปอนเซอร์สำเร็จ",
                showConfirmButton: false,
                timer: 1500
            });

            setValue("image", undefined)

            mutate('getSponsors');

        }
        catch (error) {
            Swal.fire({
                icon: "error",
                text: "เพิ่มสปอนเซอร์ไม่สำเร็จ!",
            });
            console.error("Error saving data to DynamoDB:", error);
        }
    }

    const onDelete = async (sponsorId: string) => {
        try {
            Swal.fire({
                text: "คุณต้องการลบสปอนเซอร์ใช่ไหม?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success",
                        text: "ลบสปอนเซอร์สำเร็จ",
                    });
                    const result = await deleteSponSor(sponsorId);
                    mutate('getSponsors');
                }
            });
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                text: "ลบสปอนเซอร์ไม่สำเร็จ!",
            });
            console.error("Error deleting sponsor:", error);
        }
    }

    return { register, setValue, watch, handleSubmit, onSubmit, onDelete }
}