"use client";

import Image from "next/image";
import { SponsorData } from "./SponsorPage/SponsorAdmin";


export default function CardSponsor({ sponsorId, sponsorUrl }: SponsorData) {
  return (
    <div
      className="flex justify-center w-full md:w-full h-full overflow-hidden"
    >
      <Image
        className="w-full object-cover object-center aspect-square"
        width={200}
        height={200}
        src={sponsorUrl}
        alt={sponsorUrl}
      />
    </div>
  );
}
