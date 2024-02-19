'use server'
import { getBanner } from "@/app/api/banner/route";
import BannerPage, { BannerData } from "@/app/components/BannerPage/BannerPage";
import { ApiDataList, ApiError } from "@/app/components/global";
export default async function ShowBannerPage() {

  const data = await getBanner() as ApiDataList<BannerData> | ApiError | undefined;

  
  return (
    <>
      <BannerPage apiData={data}/>
    </>
  )
}
