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
                text: "Sponsor added successfully",
                showConfirmButton: false,
                timer: 1500
            });

            setValue("image", undefined)

            mutate('getSponsors');

            console.log("Data saved to DynamoDB successfully");
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to add sponsor!",
            });
            console.error("Error saving data to DynamoDB:", error);
        }
    }

    const onDelete = async (sponsorId: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to delete a sponsors, right?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success",
                        text: "Sponsors delete successfully",
                    });
                    const result = await deleteSponSor(sponsorId);
                    mutate('getSponsors');
                    console.log(`Sponsors with ID ${sponsorId} deleted successfully result:`, result);
                }
            });
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to delete sponsor!",
            });
            console.error("Error deleting sponsor:", error);
        }
    }

    return { register, setValue, watch, handleSubmit, onSubmit, onDelete }
}