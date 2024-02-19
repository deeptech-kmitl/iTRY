"use client";
import React from "react";
import { useEffect, useState } from "react";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";
import { CardActivity } from "../CardActivity";
import ITryCounDown from "../CountDown/CountDown";
import NoResultData from "../NoData/NoResultData";


interface IncomingContainerProps {
  activity: ITryActivity
}

export default function IncomingContainer({ activity }: IncomingContainerProps) {
  const targetDate = new Date(activity?.openDate);
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();

  return (
    <>
      <div className="w-50 bg-gradient-to-b from-sky-900 to-slate-900 cursor-pointer rounded-md place-content-center">
        {activity ? (
          <>
            <ITryCounDown activityName={activity.activityName} openDate={activity.openDate} />

            <div className="w-4/5 mx-auto">
              <CardActivity {...activity} />
            </div>
          </>
        ) : (
          <div className="text-center p-16">
            <NoResultData text="ไม่มีกิจกรรมที่ใกล้เปิดรับสมัคร" />
          </div>
        )}
      </div>
    </>
  );
};
