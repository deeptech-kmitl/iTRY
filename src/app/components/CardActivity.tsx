"use client";

import { useState } from "react";

const dummyActivity = [
  {
    image: "/open_house.png",
    name: "OPEN HOUSE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis tortor ut nunc bibendum, ut accumsan augue cursus. Etiam laoreet risus viverra elementum finibus....",
    date: "11/12/2023 - 11/01/2023",
  },
  {
    image: "/open_house.png",
    name: "IT Camp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis tortor ut nunc bibendum, ut accumsan augue cursus. Etiam laoreet risus viverra elementum finibus....",
    date: "01/12/2023 - 11/01/2024",
  },
  {
    image: "/open_house.png",
    name: "TO BE IT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis tortor ut nunc bibendum, ut accumsan augue cursus. Etiam laoreet risus viverra elementum finibus....",
    date: "11/12/2023 - 11/01/2023",
  },
  {
    image: "/open_house.png",
    name: "Unite Camp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis tortor ut nunc bibendum, ut accumsan augue cursus. Etiam laoreet risus viverra elementum finibus....",
    date: "11/12/2023 - 11/01/2023",
  },
];

export const CardAllActivity = () => {
  return (
    <div>
      {dummyActivity.map((route, key) => (
        <div className="w-50 bg-slate-900 border-solid cursor-pointer rounded-md place-content-center mb-5 shadow shadow-neonBlue">
          <div key={key} className="card card-side mb-5 bg-slate-900 shadow-xl">
            <figure>
              <img
                className="w-full h-auto"
                src={route.image}
                alt={route.image}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl">{route.name}</h2>
              <p className="text-base text-stone-400">{route.description}</p>
              <p className="text-cyan-400">รับสมัคร : {route.date}</p>
              <p className="text-bold text-cyan-400 text-right text-sm">
                Read More
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const FilterActivity = () => {
  const [sortByDate, setSortByDate] = useState(false);
  var toggleSortByDate = () => {
    setSortByDate(!sortByDate);
  };

  const sortedActivities = [...dummyActivity].sort((a, b) => {
    const dateA = new Date(a.date.split(" - ")[0]).getTime();
    const dateB = new Date(b.date.split(" - ")[0]).getTime();
    return sortByDate ? dateA - dateB : dateB - dateA;
  });

  return (
    <div>
      <details className="dropdown pt-16 pb-5">
        <summary className="m-1 btn">ทั้งหมด</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <a onClick={toggleSortByDate}>วันที่ล่าสุด</a>
          </li>
          <li>
            <a onClick={toggleSortByDate}>วันที่เก่าสุด</a>
          </li>
        </ul>
      </details>{" "}
      {sortedActivities.map((route, key) => (
        <a className="w-50 bg-slate-900 border-solid cursor-pointer rounded-md place-content-center mb-5 shadow shadow-neonBlue">
          <div key={key} className="card card-side mb-5 bg-slate-900 shadow-xl">
            <figure>
              <img
                className="w-full h-auto"
                src={route.image}
                alt={route.image}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl">{route.name}</h2>
              <p className="text-base text-stone-400">{route.description}</p>
              <p className="text-cyan-400">รับสมัคร : {route.date}</p>
              <p className="text-bold text-cyan-400 text-right text-sm">
                Read More
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export const CardActivityAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const filteredActivities = dummyActivity.filter((route) =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
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

      {filteredActivities.map((route, key) => (
        <div className="w-50 bg-slate-900 border-solid cursor-pointer rounded-md place-content-center mb-5 shadow shadow-neonBlue">
          <div key={key} className="card card-side mb-5 bg-slate-900 shadow-xl">
            <figure>
              <img
                className="w-full h-auto"
                src={route.image}
                alt={route.image}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl">{route.name}</h2>
              <p className="text-base text-stone-400">{route.description}</p>
              <p className="text-cyan-400">รับสมัคร : {route.date}</p>
              <div className="text-bold text-cyan-400 text-right text-sm">
                <span>
                  <button className="border-solid bg-cyan-300 text-black rounded-xl px-5 py-3 font-semibold text-smtext-center mr-5">
                    แก้ไข
                  </button>
                  <button
                    className="btn border-solid border-2 border-cyan-400 bg-slate-800 text-white rounded-xl px-5 text-center font-semibold text-sm"
                    onClick={openDialog}
                  >
                    ลบ
                  </button>
                  {isDialogOpen && (
                    <dialog
                      id="my_modal"
                      className="modal modal-bottom sm:modal-middle"
                      open
                    >
                      <div className="modal-box text-center bg-white">
                        <h3 className="font-bold text-lg"></h3>
                        <p className="py-4 text-2xl text-slate-400 font-semibold">
                          คุณต้องการลบกิจกรรมหรือไม่?
                        </p>
                        <div className="modal-action justify-center items-center">
                          <form method="dialog">
                            <button className="btn border-transparent bg-slate-300 text-slate-500 px-10 mr-5" onClick={closeDialog}>
                              ยกเลิก
                            </button>
                            <button className="btn border-transparent bg-red-600 text-white px-10" onClick={closeDialog}>
                              ยืนยัน
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  )}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
