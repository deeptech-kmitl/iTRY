"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {AllActivityPage} from "@/app/components/AllActivityPage/AllActivityPage";

export default function AllActivity() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const per_page = searchParams.get("per_page") ?? "10";
  console.log(">>>>>>>>>>", page);
  const [sortByDate, setSortByDate] = useState("asc");

  // skipped and limited
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page); // 5, 10, 15 ...

  return (
    <div>
      <div className="">
        <h1 className="text-3xl text-extrabold">กิจกรรมทั้งหมด</h1>
      </div>
      <details className="dropdown pt-10 pb-5">
        <summary className="m-1 btn">ทั้งหมด</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <a onClick={()=>setSortByDate("asc")}>วันที่ใกล้สุด</a>
          </li>
          <li>
            <a onClick={()=>setSortByDate("desc")}>วันที่ช้าสุด</a>
          </li>
        </ul>
      </details>{" "}
      <AllActivityPage page={page} per_page={per_page} user={'camper'} sort={sortByDate} />
    </div>
  );
}
