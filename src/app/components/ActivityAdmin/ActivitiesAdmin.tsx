"use client"
import { redirect } from "next/navigation";
import ITryButton from "../Button";
import { useState } from "react";
import ITryModal from "../Modal";
import ITryInput from "../Input";
import useActivityAdminPage from "@/app/utils/ActivityAdminPage.tsx/useActivityAdminPage";
import { TypeActivity } from "../ManageActivityPage/activity";
import AllActivitiesContainer from "../Home/AllActivitiesContainer";
import { ActivityApiData } from "@/app/utils/ManageActivityPage/activity";
import { ApiError } from "../global";

interface ActivitiesAdminProps {
  activitiesCamper: ActivityApiData | ApiError | undefined
  activitiesStaff: ActivityApiData | ApiError | undefined
  page: number
}

export default function ActivitiesAdmin({ activitiesCamper, activitiesStaff, page }: ActivitiesAdminProps) {

  const radioData = [
    {
      name: "ผู้เข้าร่วมกิจกรรม",
      value: "camper"
    },
    {
      name: "สต๊าฟ",
      value: "staff"
    }
  ]

  const {
    isOpen,
    openTypeActivity,
    closeTypeActivity,
    register,
    handleSubmit,
    onSubmit,
    errors
  } = useActivityAdminPage()


  const modalTypeActivityContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <ITryInput type="radio" register={register("typeActivity")} radioData={radioData} defaultIndex={0} showError={!!errors.typeActivity} name="typeActivity" label="ประเภทกิจกรรม" required customContainerClassName="justify-center" />
      <ITryButton type="submit">ยืนยัน</ITryButton>
    </form>
  )

  const [tabSelected, setTabSelected] = useState<TypeActivity>("camper")
  const selectedActivities = tabSelected === "camper" ? activitiesCamper : activitiesStaff

  return (
    <>
      <h1 className="text-3xl text-extrabold text-center mb-5">กิจกรรมทั้งหมด</h1>
      <div className="flex justify-between mb-5 items-center">
        <div className="w-fit h-full">
          <div role="tablist" className="tabs tabs-boxed border-color-primary border">
            <a role="tab" onClick={() => setTabSelected("camper")} className={`tab text-white ${tabSelected === "camper" && "bg-linear-blue"}`}>Camper</a>
            <a role="tab" onClick={() => setTabSelected("staff")} className={`tab text-white ${tabSelected === "staff" && "bg-linear-blue"}`}>Staff</a>
          </div>
        </div>
        <ITryButton onClick={openTypeActivity}>
          สร้างกิจกรรม
        </ITryButton>
      </div>
      <AllActivitiesContainer activitiesData={selectedActivities} showPagination page={page}  />
      <ITryModal isOpen={isOpen} onClose={closeTypeActivity} title="กรุณาเลือกประเภทกิจกรรมที่ต้องการสร้าง" content={modalTypeActivityContent} customClassName="p-8" titleCenter />
    </>
  )
}