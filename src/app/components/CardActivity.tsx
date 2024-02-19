"use client"

import Link from "next/link";
import { ITryActivity, ITryActivityCard } from "../utils/ManageActivityPage/activity";
import Image from "next/image";
import { reduceHtml } from "../utils/reduceHtmlTag";
import { convertDateToThai } from "../utils/convertDateToThai";
import ITryButton from "./Button";

export const CardActivity = ({ activityId, activityDetails, activityName, closeDate, imageUrl, openDate, typeActivity }: ITryActivity) => {

  const activityDetailsReduced = activityDetails ? reduceHtml(activityDetails, 3) + "<span>...</span>" : "ไม่มีรายละเอียดกิจกรรม";

  return (
    <div className="w-50 bg-slate-900 border-solid rounded-md place-content-center mb-5 shadow shadow-neonBlue">
      <div className="card card-side mb-5 bg-slate-900 shadow-xl w-full h-full">
        <Image priority className="w-3/6 aspect-video object-center object-cover" alt="" src={imageUrl as string} width={200} height={200} />
        <div className="card-body">
          <h2 className="card-title text-base md:text-xl lg:text-2xl">{activityName}</h2>
          <p className="text-base text-stone-400" dangerouslySetInnerHTML={{ __html: activityDetailsReduced }} />
          <p className="text-cyan-400">
            รับสมัครวันที่ : {convertDateToThai(openDate)} - {convertDateToThai(closeDate)}
          </p>
          <Link href={`/${typeActivity}/activity-details/${activityId}`} className="text-bold text-cyan-400 text-right text-sm w-fit self-end" shallow>
            <ITryButton>อ่านรายละเอียดเพิ่มเติม</ITryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
