"use server"

import { getSponsor } from "@/app/api/sponsor/route";
import SponsorPage, { SponsorData } from "@/app/components/SponsorPage/SponsorAdmin";
import { ApiDataList, ApiError } from "@/app/components/global";

export default async function ShowSponSorPage() {

  const data = await getSponsor() as ApiDataList<SponsorData> | ApiError | undefined
  console.log(data);

  return (
    <>
      <SponsorPage data={ data } />
    </>
  );
}