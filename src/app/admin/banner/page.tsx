'use server'
import { getBanner } from "@/app/api/banner/route";
import BannerPage, { BannerApi} from "@/app/components/BannerPage/BannerPage";
export default async function ShowBannerPage() {

  const data = await getBanner() as BannerApi | { error: unknown, status:"error" } | undefined;

  console.log("apiData", data);

  
  return (
    <>
      <BannerPage apiData={data}/>
    </>
  )
}
