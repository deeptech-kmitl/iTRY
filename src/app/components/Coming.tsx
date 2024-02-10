"use client";

import { useEffect, useState } from "react";

const dummyData = [
  {
    name: "IT Open House 2023",
    image: "/open_house.png",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit est qui dolorem....",
  },
];

export const Coming = () => {
  const [days, setDays] = useState(3);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(45);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);

      if (seconds === 1) {
        setMinutes(prevMinutes => prevMinutes - 1);
        setSeconds(59);
      }

      if (minutes === 1) {
        setHours(prevHours => prevHours - 1);
        setMinutes(59);
      }

      if (hours === 1) {
        setDays(prevDays => prevDays - 1);
        setHours(23);
      }
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [days, hours, minutes, seconds]);  

  return (
    <div>
      {dummyData.map((route, key) => (
        <div className="w-50 bg-gradient-to-b from-sky-900 to-slate-900 cursor-pointer pb-5 rounded-md place-content-center mb-5">
          <div className="text-center py-10">
            <span className="text-3xl font-bold">{route.name}</span>
            <span className="text-3xl font-bold"> is Coming</span>
          </div>
          <div className="justify-center mb-16 grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col px-8">
              <span className="font-mono text-5xl">
                <span >{days}</span>
              </span>
              days
            </div>
            <div className="flex flex-col px-8">
              <span className="font-mono text-5xl">
                <span >{hours}</span>
              </span>
              hours
            </div>
            <div className="flex flex-col px-8">
              <span className="font-mono text-5xl">
                <span >{minutes}</span>
              </span>
              minutes
            </div>
            <div className="flex flex-col px-8">
              <span className="font-mono text-5xl">
                <span >{seconds}</span>
              </span>
              second
            </div>

          </div>
          <div className="w-4/5 bg-slate-900 border-2 border-neonBlue cursor-pointer rounded-md mx-auto mb-5 ">
            <div
              key={key}
              className="card card-side bg-gradient-to-r from-slate-800 to-slate-900"
            >
              <figure>
                <img
                  className="w-full h-auto"
                  src={route.image}
                  alt={route.image}
                />
              </figure>
              <div className="card-body">
                <p className="text-lg text-white pb-10">{route.description}</p>
                <p className="text-bold text-cyan-400 text-right text-sm">
                  Read More
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
