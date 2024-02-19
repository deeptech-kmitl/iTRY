"use client"

import { getSponSors } from "@/app/api/sponsor/route";
import SponsorPage, { SponsorData } from "@/app/components/SponsorPage/SponsorAdmin";
import { ApiDataList, ApiError } from "@/app/components/global";
import useSWR from "swr";

export default async function ShowSponSorPage() {

  const { data, error } = useSWR('getSponsors', getSponSors);

  if (error) {
    // Handle error case
    return <div>Error</div>;
  }

  return (
    <>
      <SponsorPage data={data as ApiDataList<SponsorData> | ApiError | undefined } />
    </>
  );
}