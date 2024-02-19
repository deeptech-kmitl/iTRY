'use client'
import { getBanner } from "@/app/api/banner/route";
import BannerPage, { BannerData } from "@/app/components/BannerPage/BannerPage";
import { ApiDataList, ApiError } from "@/app/components/global";
import useSWR from "swr";
export default function ShowBannerPage() {

  // const data = await getBanner() as ApiDataList<BannerData> | ApiError | undefined;
  const { data, error } = useSWR('getBanner', getBanner);

  if (error) {
    // Handle error case
    return <div>Error</div>;
  }
  
  return (
    <>
      <BannerPage apiData={data as ApiDataList<BannerData> | ApiError | undefined}/>
    </>
  )
}
