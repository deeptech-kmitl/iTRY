"use client"

import useSponsor from "@/app/utils/SponsorPage/useSponsor";
import ITryButton from "../Button";
import ITryInput from "../Input";
import Image from "next/image";
import { ApiDataList, ApiError } from "../global";
import ManageableImage from "../ManageableImage/ManageableImage";

interface SponsorPageProps {
  data: ApiDataList<SponsorData> | ApiError | undefined;
}

export interface SponsorData {
  sponsorId: string;
  sponsorUrl: string;
}

export default function SponsorPage({ data }: SponsorPageProps) {
  const { register, setValue, watch, handleSubmit, onSubmit, onDelete } = useSponsor();
  if (data && 'status' in data && data.status === 'error') {
    return <div>Error</div>
  }
  else if (Array.isArray(data?.data)) {
    return (
      <div>
        <h1 className="text-3xl text-extrabold text-center pb-16">Sponsor</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 place-items-center">
          {data.data.map((item, key) => (
            <div key={item.sponsorId}>
              <div className="w-full h-full rounded overflow-hidden md:p-5 p-1">
                <ManageableImage itemId={item.sponsorId} itemImageUrl={item.sponsorUrl} onDelete={onDelete} />
              </div>
            </div>
          ))}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full rounded overflow-hidden md:p-5 p-1">
            <ITryInput type="image" register={register} file={watch("image")} formKeyFile="image" setValue={setValue} />
            <ITryButton type="submit" customPositionClassName="mt-0" fullWidth>เพิ่ม sponsor</ITryButton>
          </form>
        </div>
      </div>
    );
  }
  else {
    return <div>No data</div>;
  }
}
