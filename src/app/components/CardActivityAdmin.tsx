"use client";

import { useState } from "react";

export const CardActivityAdmin = (props: any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="w-50 bg-slate-900 border-solid cursor-pointer rounded-md place-content-center mb-5 shadow shadow-neonBlue">
        <div className="card card-side mb-5 bg-slate-900 shadow-xl">
          <img className="w-3/6 h-auto" src={props.image} alt={props.image} />
          <div className="card-body">
            <h2 className="card-title text-2xl">{props.name}</h2>
            <p className="text-base text-stone-400">{props.description}</p>
            <p className="text-cyan-400">รับสมัคร : {props.date}</p>
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
                            onClick={closeDialog}
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
    </div>
  );
};

export const ButtonAdmin = () => {
    return (
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
    
    
    )
}
