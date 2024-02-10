"use client";

import React from "react";
import { FilterActivity } from "../../components/CardActivity";

export default function AllActivity() {
  return (
    <div className="py-16">
      <div className="pb-5">
        <h1 className="text-3xl text-extrabold">กิจกรรมทั้งหมด</h1>
      </div>
      <FilterActivity />
    </div>
  );
}
