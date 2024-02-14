'use server'
import { uploadFileToS3 } from "@/app/api/create/staffActivity/route";
import ITryButton from "@/app/components/Button";
import ITryInput from "@/app/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { set, useForm } from "react-hook-form";
import * as yup from "yup"
import { getBanner } from "@/app/api/banner/route";
import useBannerPage from "@/app/utils/BannerPage/useBannerPage";
import BannerPage, { BannerData } from "@/app/components/BannerPage/BannerPage";
export default async function ShowBannerPage() {

  const data = await getBanner() as BannerData[] | { error: unknown, status:"error" } | undefined;

  console.log("data", data);

  
  return (
    <>
      <BannerPage data={data}/>
    </>
  )
}
