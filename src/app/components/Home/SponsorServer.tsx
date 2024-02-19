"use server"
import { getSponSors } from "@/app/api/sponsor/route";
import SponsorContainer from "./SponsorContainer";
import { ApiDataList, ApiError } from "../global";
import { SponsorData } from "../SponsorPage/SponsorAdmin";

export default async function SponsorServer() {

  const sponsors = await getSponSors() as ApiDataList<SponsorData> | ApiError | undefined;
  console.log("sponsors", sponsors)
  return (
    <SponsorContainer sponsorsData={sponsors} />
  )
}