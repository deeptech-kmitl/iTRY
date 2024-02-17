"use client"

import useSponsor from "@/app/utils/SponsorPage/useSponsor";
import ITryButton from "../Button";
import ITryInput from "../Input";
import Image from "next/image";

interface SponsorPageProps {
  data: SponsorApi | { error: unknown, status: "error" } | undefined;
}

export interface SponsorApi {
  status: 'success',
  data: SponsorData[]
}

interface SponsorData {
  sponsorId: string;
  sponsorUrl: string;
}

export default function SponsorPage({ data }:  SponsorPageProps) {
  const { register, setValue, watch, handleSubmit, onSubmit, deleteSponsor } = useSponsor();
  if (data && 'status' in data && data.status === 'error') {
    return <div>Error</div>
  }
  else if (Array.isArray(data?.data)) {
    return (
      <div>
        <h1 className="text-3xl text-extrabold text-center pb-16">Sponsor</h1>
        <div className="grid grid-cols-4 place-items-center">
        {data.data.map((item, key) => (
          <div key={item.sponsorId} className="card w-48 bg-base-100 shadow-xl mb-10">
            <figure>
            <Image className="w-full" src={item.sponsorUrl} alt={item.sponsorUrl} width={700} height={300} />
            </figure>
            <div className="card-body">
              <div className="card-actions justify-center">
              <ITryButton customWidthClassName="w-full" onClick={() => deleteSponsor(item.sponsorId)}>ลบ</ITryButton>
              </div>
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:px-8 px-0">
        <ITryInput type="image" register={register} file={watch("image")} formKeyFile="image" setValue={setValue} />
        <ITryButton type="submit" customPositionClassName="mt-5" fullWidth>เพิ่ม sponsor</ITryButton>
        </form>
      </div>
    </div>
    );
  }
  else {
    return <div>No data</div>;
  }
}
