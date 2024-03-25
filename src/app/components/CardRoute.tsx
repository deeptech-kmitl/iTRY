"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ITryButton from "./Button";
import ITryInput from "./Input";
import useAddRoute from "../utils/AddRoutePage/useAddRoute";
import { ApiDataList, ApiError } from "./global";

interface CardRoutesProps {
  role: string;
  route: any;
}

export default function CardRoutes({ role, route }: CardRoutesProps) {
  // -------------------- for user side --------------------
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDetail, setSelectedDetail] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [routeId, setRouteId] = useState("");

  const openModal = (
    cardTitle: string,
    cardDetail: string,
    cardImage: string
  ) => {
    setModalOpen(true);
    setSelectedTitle(cardTitle);
    setSelectedDetail(cardDetail);
    setSelectedImage(cardImage);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // -------------------- for admin side --------------------
  const [isEditModal, setEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  const { setValue, getValues, handleSubmit, errors, onSubmit } =
    useAddRoute(routeId);

  const openEditModal = (
    editTitle: string,
    routeDetail: string,
    routeId: string
  ) => {
    setEditModal(true);
    setEditTitle(editTitle);
    setRouteId(routeId);
    setSelectedDetail(routeDetail); // ดึงรายละเอียดการเดินทางเก่าจาก DB มาแสดง
  };
  const closeEditModal = () => {
    setEditModal(false);
  };
  const confirmEdit = () => {
    // ปุ่มยืนยันการแก้ไข -> save data
    setEditModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-4">
        {route
          ? route.map((item: any, key: any) => (
              <div key={key}>
                <div
                  className={`card w-full md:w-44 bg-base-100 border-solid border-2 border-neonBlue pt-3 rounded-md ${
                    role === "user"
                      ? "transform transition-transform duration-300 hover:scale-110 hover:bg-stone-900"
                      : ""
                  }`}
                  onClick={() =>
                    openModal(item.vehicle, item.description, item.image)
                  }
                >
                  <div className="px-3">
                    <figure className="border-[1px] border-white py-8 rounded-3xl">
                      <Image
                        src={item.image}
                        alt={item.vehicle}
                        width="100"
                        height="100"
                        loading="lazy"
                        layout="responsive"
                        
                      />
                    </figure>
                  </div>
                  <div className="py-2">
                    <h5 className="card-title justify-center text-[12px] md:text-sm text-center">
                      {item.vehicle}
                    </h5>
                  </div>
                </div>

                {role === "admin" && (
                  <div className="pt-3">
                    <button
                      className="text-white btn btn-sm w-full bg-base-100 border-solid border-2 border-neonBlue rounded-md hover:scale-110 hover:bg-lightBlue hover:text-stone-950"
                      onClick={() =>
                        openEditModal(
                          item.vehicle,
                          item.description,
                          item.routeId
                        )
                      }
                    >
                      แก้ไข
                    </button>
                  </div>
                )}
              </div>
            ))
          : null}
      </div>

      {/* Modal Show Route Detail For User Side */}
      {isModalOpen && role === "user" && (
        <div className="modal-overlay fixed top-0 left-0 flex justify-center items-center w-full h-full z-10 bg-navyBlue/50 backdrop-blur-[5px]">
          <div className="modal-box border-2 border-neonBlue w-full max-w-lg">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="card">
              <div className="p-2 flex flex-col md:flex-row h-full">
                <figure className="border-[1px] border-white rounded-3xl w-full md:w-2/5">
                  <Image
                    src={selectedImage}
                    alt={selectedTitle}
                    width="100"
                    height="100"
                    loading="lazy"
                    layout="responsive"
                    
                  />
                </figure>
                <div className="w-full md:w-3/5 pl-5">
                  <div className="card-title">{selectedTitle}</div>
                  <div
                    className="card-normal pt-3 h-60 overflow-y-scroll scrollbar-hide"
                    dangerouslySetInnerHTML={{ __html: selectedDetail }}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  ></div>
                  {/* <div className='card-normal pt-3 h-full overflow-y-scroll scrollbar-hide' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>{selectedDetail}</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Route Detail For Admin Side */}

      {isEditModal && role === "admin" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-overlay fixed top-0 left-0 flex justify-center items-center w-full h-full z-10 bg-navyBlue/50 backdrop-blur-[5px]">
            <div className="modal-box border-2 border-neonBlue w-full max-w-lg p-10">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeEditModal}
              >
                ✕
              </button>
              <div className="card">
                <h1 className="card-title">การเดินทาง - {editTitle}</h1>
                <div className="h-[1px] bg-neonBlue mt-5"></div>
                <ITryInput
                  type="richText"
                  showError={false}
                  setValue={setValue}
                  value={selectedDetail}
                  fieldName="routeDetail"
                />
                <div className="mt-5 grid place-items-end">
                  <ITryButton
                    type="submit"
                    size="small"
                    // onClick={() => confirmEdit()}
                  >
                    ยืนยัน
                  </ITryButton>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
