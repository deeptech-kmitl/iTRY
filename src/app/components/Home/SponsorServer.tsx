"use server"
import dynamic from 'next/dynamic';
const SponsorContainer = dynamic(() => import('./SponsorContainer'), { ssr: false });
import { getSponSors } from "@/app/api/sponsor/route";
import { ApiDataList, ApiError } from "../global";
import { SponsorData } from "../SponsorPage/SponsorAdmin";

export default async function SponsorServer() {

  const sponsors = await getSponSors() as ApiDataList<SponsorData> | ApiError | undefined;
  return (
    <SponsorContainer sponsorsData={sponsors} />
  )
}