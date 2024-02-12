'use client'
import { uploadFileToS3 } from "@/app/api/create/staffActivity/route";
import ITryButton from "@/app/components/Button";
import ITryInput from "@/app/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup"
export default function BannerPage() {

  const dummyBanner = [
    {
      image: "/open_house.png",
    },
    {
      image: "/open_house.png",
    },
    {
      image: "/open_house.png",
    },
    {
      image: "/open_house.png",
    },
    {
      image: "/open_house.png",
    },
  ];

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
      <h1 className="text-3xl text-extrabold text-center pb-16">Banner</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 p-5">
        {dummyBanner.map((item, key) => (
          <div key={key}>
            <div className="w-full h-full rounded overflow-hidden md:p-5 p-1 ">
              <Image className="w-full" src={item.image} alt={item.image} width={700} height={300} />
              <ITryButton customWidthClassName="w-full" >ลบ</ITryButton>
            </div>

          </div>
        ))}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:px-8 px-0">
        <ITryInput type="image" register={register} file={watch("image")} formKeyFile="image" setValue={setValue}/>
        <ITryButton type="submit" customPositionClassName="mt-0" fullWidth>สร้าง Banner</ITryButton>
      </form>
      </div>
    </>
  )
}
