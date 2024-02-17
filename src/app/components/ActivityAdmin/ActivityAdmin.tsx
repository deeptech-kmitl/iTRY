"use client";

import { useState } from "react";
import CamperActivityPage from "./camper/CamperActivityPage";
import StaffActivityPage from "./staff/StaffActivityPage";

export const ActivityAdmin = () => {
  return (
    <div>
      <h1 className="text-3xl text-extrabold text-center mb-5">กิจกรรมทั้งหมด</h1>
      <div className="flex justify-between mb-5">
        <span>
          <button className="border-solid border-2 border-cyan-400 bg-slate-800 rounded-xl px-3 py-2 text-center font-semibold text-sm mr-5">
            Camper
          </button>
          <button className="border-solid border-2 border-white bg-cyan-300 text-black rounded-xl px-3 py-2 font-semibold text-sm text-center">
            Staff
          </button>
        </span>
        <button className="border-solid border-2 border-cyan-400 bg-slate-800 rounded-xl px-5 py-2 text-center text-sm font-semibold">
          สร้างกิจกรรม
        </button>
      </div>
    </div>
  );
};
