"use client";
import React from "react";
import { useEffect, useState } from "react";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";
import { CardActivity } from "../CardActivity";
import ITryCounDown from "../CountDown/CountDown";


interface IncomingContainerProps {
  activity: ITryActivity
}

export const IncomingContainer = ({ activity }: IncomingContainerProps) => {
  const targetDate = new Date(activity.openDate);
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();

  console.log("activity", activity)

  return (
    <div className="w-50 bg-gradient-to-b from-sky-900 to-slate-900 cursor-pointer pb-5 rounded-md place-content-center mb-5">
      <ITryCounDown activityName={activity.activityName} openDate={activity.openDate} />

      <div className="w-4/5 mx-auto">
        <CardActivity {...activity} />
      </div>
    </div>
  );
};
