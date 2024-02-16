"use server"

import { getSponsor } from "@/app/api/sponsor/route";
import SponsorPage, { SponsorApi } from "@/app/components/SponsorPage/SponsorAdmin";

export default async function ShowSponSorPage() {

  const data = await getSponsor() as SponsorApi | { error: unknown, status:"error" } | undefined
  console.log(data);

  return (
    <>
      <SponsorPage data={ data } />
    </>
  );
}