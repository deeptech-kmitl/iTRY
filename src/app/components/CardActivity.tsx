"use client";

import Link from "next/link";
import {
  ITryActivity,
  ITryActivityCard,
} from "../utils/ManageActivityPage/activity";
import Image from "next/image";
import { reduceHtml } from "../utils/reduceHtmlTag";
import { convertDateToThai } from "../utils/convertDateToThai";
import ITryButton from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const CardActivity = ({
  activityId,
  activityDetails,
  activityName,
  closeDate,
  imageUrl,
  openDate,
  typeActivity,
}: ITryActivity) => {
  const activityDetailsReduced = activityDetails
    ? reduceHtml(activityDetails, 3) + "<span>...</span>"
    : "ไม่มีรายละเอียดกิจกรรม";

  return (
    <div className="md:max-h-64 overflow-hidden transform duration-500 bg-slate-900 border-solid rounded-md shadow shadow-neonBlue mb-8 ">
      <a href={`/${typeActivity}/activity-details/${activityId}`}>
        <div className="flex flex-wrap md:flex-nowrap shadow-lg">
          <Image
            priority
            className="w-full md:w-3/6 h-auto aspect-video object-cover  "
            alt=""
            src={imageUrl as string}
            width={200}
            height={200}
          />
          <div className="card-body w-full">
            <h2 className="card-title text-base md:text-xl lg:text-2xl">
              {activityName}
            </h2>
            <p
              className="text-base text-stone-400 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: activityDetailsReduced }}
            />
            <p className="text-cyan-400 text-xs md:text-sm line-clamp-1">
              รับสมัครวันที่ : {convertDateToThai(openDate)} -{" "}
              {convertDateToThai(closeDate)}
            </p>
            {/* <Link
            href={`/${typeActivity}/activity-details/${activityId}`}
            className="text-bold text-cyan-400 text-right text-sm w-fit self-end"
            shallow
          >
            <ITryButton>อ่านรายละเอียดเพิ่มเติม</ITryButton>
          </Link> */}
            <p className="text-bold text-cyan-400 text-right text-sm mt-3">
              Read More
              <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};
