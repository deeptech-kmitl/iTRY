"use client"

import Link from "next/link";
import { ITryActivity, ITryActivityCard } from "../utils/ManageActivityPage/activity";
import Image from "next/image";
import { reduceHtml } from "../utils/reduceHtmlTag";

export const CardActivity = async ({ activityId, activityDetails, activityName, closeDate, imageUrl, openDate, typeActivity }: ITryActivity) => {

  const activityDetailsReduced = reduceHtml(activityDetails, 3) + "<span>...</span>";

  return (
    <Link href={`/${typeActivity}/activity-details/${activityId}`}>
      <div className="w-50 bg-slate-900 border-solid cursor-pointer rounded-md place-content-center mb-5 shadow shadow-neonBlue aspect-ratio-card-activity">
        <div className="card card-side mb-5 bg-slate-900 shadow-xl w-full h-full">
          <Image priority className="w-3/6 h-auto object-cover" alt="" src={imageUrl as string} width={200} height={200} />
          <div className="card-body">
            <h2 className="card-title text-2xl">{activityName}</h2>
            <p className="text-base text-stone-400" dangerouslySetInnerHTML={{ __html: activityDetailsReduced }} />
            <p className="text-cyan-400">
              รับสมัคร : {openDate} - {closeDate}
            </p>
            <a className="text-bold text-cyan-400 text-right text-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};
