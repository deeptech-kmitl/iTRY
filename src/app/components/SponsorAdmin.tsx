"use client";
import React from "react";
import { useState, useEffect } from "react";

const dummySponsor = [
  {
    image: "/test_sponsor_amazoncafe.png",
  },
  {
    image: "/test_sponsor_lactasoi.png",
  },
  {
    image: "/test_sponsor_major.jpg",
  },
  {
    image: "/test_sponsor_mama.png",
  },
  {
    image: "/test_sponsor_pepsi.png",
  },
];

export const SponsorAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSponsorIndex, setSelectedSponsorIndex] = useState(null);

  const openDialog = (index) => {
    setIsDialogOpen(true);
    setSelectedSponsorIndex(index);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedSponsorIndex(null);
  };

  const deleteSponsor = () => {
    if (selectedSponsorIndex !== null) {
      const newSponsors = [...dummySponsor];
      newSponsors.splice(selectedSponsorIndex, 1);
      setIsDialogOpen(false);
      setSelectedSponsorIndex(null);
    }
  };

  return (
    <div className="grid grid-cols-4 place-items-center">
      {dummySponsor.map((route, key) => (
        <div key={key} className="card w-48 bg-base-100 shadow-xl mb-10">
          <figure>
            <img src={route.image} alt={route.image} />
          </figure>
          <div className="card-body">
            <div className="card-actions justify-center">
              <button
                className="btn bg-cyan-500 px-20 text-slate-800 text-lg"
                onClick={() => openDialog(key)}
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
                      คุณต้องการลบ Sponsor
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
                          onClick={deleteSponsor}
                        >
                          ลบ
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              )}{" "}
            </div>
          </div>
        </div>
      ))}
      <button className="w-48 border-dashed border-2 border-cyan-400 py-20 bg-base-100 shadow-xl mb-10 rounded-md">
        <figure>
          <div className="border-solid border-2 border-slate-400 w-20 py-3 mx-auto rounded-md">
            <input type="file" className="hidden" id="fileInput" accept="image/*" />
            <label
              htmlFor="fileInput"
              className="text-3xl text-slate-400 font-semibold cursor-pointer"
            >
              +
            </label>
          </div>
        </figure>
      </button>
    </div>
  );
};
