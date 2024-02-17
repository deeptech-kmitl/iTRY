"use client";

import Image from "next/image";
import { useState } from "react";

interface StaffActivityData {
  activityId: string;
  activityDetails: string;
  activityName: string;
  imageUrl: string;
  openDate: string;
  closeDate: string;
}

interface StaffActivityProps {
  data: StaffActivityApi | { error: unknown; status: "error" } | undefined;
}

export interface StaffActivityApi {
  status: "success";
  data: StaffActivityData[];
}

export default function StaffActivityPage({ data }: StaffActivityProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    console.log("ลบ");
    closeDialog();
  };

  if (data && "status" in data && data.status === "error") {
    return <div>Error</div>;
  } else if (Array.isArray(data?.data)) {
    return (
      <div>
        {data.data.map((item, key) => (
          <div
            key={item.activityId}
            className="w-50 bg-slate-900 border-solid cursor-pointer rounded-md place-content-center mb-5 shadow shadow-neonBlue"
          >
            <div className="card card-side mb-5 bg-slate-900 shadow-xl">
              <Image
                className="w-3/6 h-auto"
                src={item.imageUrl}
                alt={item.imageUrl}
              />
              <div className="card-body">
                <h2 className="card-title text-2xl">{item.activityName}</h2>
                <p className="text-base text-stone-400">
                  {item.activityDetails}
                </p>
                <p className="text-cyan-400">
                  รับสมัคร : {item.openDate} - {item.closeDate}
                </p>
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
                              <button
                                className="btn border-transparent bg-slate-300 text-slate-500 px-10 mr-5"
                                onClick={closeDialog}
                              >
                                ยกเลิก
                              </button>
                              <button
                                className="btn border-transparent bg-red-600 text-white px-10"
                                onClick={handleDelete}
                              >
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
  } else {
    return <div>No data</div>;
  }
}
