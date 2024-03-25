'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { createBanner, deleteBanner } from "@/app/api/banner/route";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import Swal from 'sweetalert2';
import { uploadFileToS3 } from "@/app/api/uploadFile/route";


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
            Swal.fire({
                icon: "success",
                text: "เพิ่มแบนเนอร์สำเร็จ",
                showConfirmButton: false,
                timer: 1500
            });
            mutate('getBanner');
            setValue("image", undefined)
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "เพิ่มแบนเนอร์ไม่สำเร็จ!",
            });
            console.error("Error saving data to DynamoDB:", error);
        }
    }

    const onDeleteBanner = async (bannerId: string) => {
        try {
            Swal.fire({
                text: "คุณต้องการลบแบนเนอร์ใช่ไหม?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success",
                        text: "ลบแบนเนอร์สำเร็จ",
                    });
                    const result = await deleteBanner(bannerId);
                    mutate('getBanner');
                }
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "ลบแบนเนอร์ไม่สำเร็จ!",
            });
        }
    }

    return { register, setValue, watch, handleSubmit, onSubmit, onDeleteBanner }
}