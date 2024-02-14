"use client";
import React from "react";
import { useState } from "react";
import { CardActivityAdmin, ButtonAdmin } from "@/app/components/CardActivityAdmin";
import { Paging } from "@/app/components/Paging";

export default function ActivityPage() {
  const activity = [
    {
      image: "/open_house.png",
      name: "OPEN HOUSE",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis tortor ut nunc bibendum, ut accumsan augue cursus. Etiam laoreet risus viverra elementum finibus....",
      date: "11/12/2023 - 12/12/2023",
    },
    {
      image: "/open_house.png",
      name: "IT Camp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis tortor ut nunc bibendum, ut accumsan augue cursus. Etiam laoreet risus viverra elementum finibus....",
      date: "04/09/2023 - 07/09/2023",
    },
    {
      image: "/open_house.png",
      name: "TO BE IT",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis tortor ut nunc bibendum, ut accumsan augue cursus. Etiam laoreet risus viverra elementum finibus....",
      date: "20/11/2023 - 23/11/2023",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredActivities = activity.filter((activity) =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="pb-5">
        <h1 className="text-3xl text-extrabold text-center">กิจกรรมทั้งหมด</h1>
      </div>
      <div className="flex justify-center items-center py-10">
        <form action="" className="max-w-[480px] w-full px-4 pb-10">
          <div className="relative">
            <input
              type="text"
              className="w-full border h-12 shadow p-4 rounded-md"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>
      <ButtonAdmin />

      {filteredActivities.map((activity, index) => (
        <CardActivityAdmin
          key={index}
          image={activity.image}
          name={activity.name}
          description={activity.description}
          date={activity.date}
        />
      ))}
      <Paging/>
    </div>
  );
}
