"use client";

import React from "react";
import { useState } from "react";
import { CardActivity } from "@/app/components/CardActivity";
import { Paging } from "@/app/components/Paging";

export default function FollowActivity() {

  // const [sortByDate, setSortByDate] = useState(false);

  // const toggleSortByDate = () => {
  //   setSortByDate(!sortByDate);
  // };

  // const activities = [
  //   {
  //     image: "/open_house.png",
  //     name: "OPEN HOUSE",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis tortor ut nunc bibendum, ut accumsan augue cursus. Etiam laoreet risus viverra elementum finibus....",
  //     date: "11/12/2023 - 12/12/2023",
  //   },
  //   {
  //     image: "/open_house.png",
  //     name: "IT Camp",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis tortor ut nunc bibendum, ut accumsan augue cursus. Etiam laoreet risus viverra elementum finibus....",
  //     date: "04/09/2023 - 07/09/2023",
  //   },
  //   {
  //     image: "/open_house.png",
  //     name: "TO BE IT",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis tortor ut nunc bibendum, ut accumsan augue cursus. Etiam laoreet risus viverra elementum finibus....",
  //     date: "20/11/2023 - 23/11/2023",
  //   },
  // ];

  // const sortedActivities = [...activities].sort((a, b) => {
  //   const dateA = new Date(
  //     a.date.split(" - ")[0].split("/").reverse().join("-")
  //   ).getTime();
  //   const dateB = new Date(
  //     b.date.split(" - ")[0].split("/").reverse().join("-")
  //   ).getTime();
  //   return sortByDate ? dateB - dateA : dateA - dateB;
  // });



  // return (
  //   <div className="py-16">
  //     <div className="pb-5">
  //       <h1 className="text-3xl text-extrabold">กิจกรรมที่กำลังติดตาม</h1>
  //     </div>

  //     <details className="dropdown pt-10 pb-5">
  //       <summary className="m-1 btn">ทั้งหมด</summary>
  //       <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
  //         <li>
  //           <a onClick={toggleSortByDate}>วันที่ล่าสุด</a>
  //         </li>
  //         <li>
  //           <a onClick={toggleSortByDate}>วันที่เก่าสุด</a>
  //         </li>
  //       </ul>
  //     </details>{" "}

  //     {sortedActivities.map((activity, index) => (
  //       <CardActivity
  //         key={index}
  //         {...activity}
  //       />
  //     ))}{" "}

  //     <Paging/>


  //   </div>
  // );
}
