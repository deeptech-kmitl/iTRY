"use client";

import { JobPositionsActivity } from "../utils/ManageActivityPage/activity";

export default function CardPosition({ amount, name }: JobPositionsActivity) {
  return (
    <div className="card w-full card-position bg-base-100 border-solid border-2 border-neonBlue rounded-md">
      <div className="py-2 h-[50%] bg-lightBlue flex justify-center text-center">
        <h5 className="card-title justify-center text-sm xl:text-xl text-black">
          {name}
        </h5>
      </div>
      <div className="py-2 h-[50%] bg-[#2B79A4] flex flex-col justify-center items-center">
        <h5 className="text-xs">จำนวน</h5>
        <h5 className="card-title text-2xl pt-2">{amount}</h5>
      </div>
    </div>
  );
}
