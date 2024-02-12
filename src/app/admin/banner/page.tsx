'use client'
import { uploadFileToS3 } from "@/app/api/create/staffActivity/route";
import ITryButton from "@/app/components/Button";
import ITryInput from "@/app/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
export default function BannerPage() {

  const schema = yup.object().shape({
    image: yup.mixed(),
  });

  const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    let savedData = { ...data }
    if (typeof (data.imageUrl) !== "string") {
      const imageUrl = data.imageUrl;
      const realImageUrl: any = await uploadFileToS3(imageUrl)
      console.log("realImageUrl"), realImageUrl
      savedData = { ...data, imageUrl: realImageUrl }
    }
  } 

  console.log("watch(image)", watch("image"))

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-16">
        <ITryInput type="image" register={register} file={watch("image")} formKeyFile="image" setValue={setValue} label="รูปภาพปกกิจกรรม" />
        <ITryButton type="submit" customPositionClassName="mt-24" fullWidth>สร้าง Banner</ITryButton>
      </form>
    </>
  )
}