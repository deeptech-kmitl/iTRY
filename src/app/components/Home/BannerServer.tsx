"use server"

import dynamic from 'next/dynamic';
const BannerContainer = dynamic(() => import('./BannerContainer'), { ssr: false });
import { getBanner } from "@/app/api/banner/route";
import { ApiDataList, ApiError } from "../global";
import { BannerData } from "../BannerPage/BannerPage";

export default async function BannerServer() {
  const banners = await getBanner() as ApiDataList<BannerData> | ApiError | undefined;
  return (
    <BannerContainer bannersData={banners} />
  )
}