'use client'

import { uploadFileToS3 } from "@/app/api/create/staffActivity/route";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"

export default function useBannerPage() {
    const schema = yup.object().shape({
        image: yup.mixed(),
    });

    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        let savedData = { ...data }
        const image = data.image;
        const imageUrl: any = await uploadFileToS3(image)
        console.log("imageUrl"), imageUrl
        savedData = { ...data, imageUrl: imageUrl }

        console.log("watch(image)", watch("image"))
    }
    return {register, setValue, watch, handleSubmit, onSubmit}
}