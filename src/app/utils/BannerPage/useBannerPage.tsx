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
                text: "Banner added successfully",
                showConfirmButton: false,
                timer: 1500
            });
            mutate('getBanner');
            setValue("image", undefined)
            console.log("Data saved to DynamoDB successfully result:", result);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to add banner!",
            });
            console.error("Error saving data to DynamoDB:", error);
        }
    }

    const onDeleteBanner = async (bannerId: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to delete a banner, right?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success",
                        text: "Banner delete successfully",
                    });
                    const result = await deleteBanner(bannerId);
                    mutate('getBanner');
                    console.log(`Banner with ID ${bannerId} deleted successfully result:`, result);
                }
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to delete banner!",
            });
            console.log("Error deleting banner:", error);
        }
    }

    return { register, setValue, watch, handleSubmit, onSubmit, onDeleteBanner }
}