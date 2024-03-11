'use client'
import AddActivityHeader from "@/app/components/ManageActivityPage/Header"
import ITryButton from "@/app/components/Button"
import ITryInput from "@/app/components/Input"
import useManageActivity from "@/app/utils/ManageActivityPage/useManageActivity"
import { TypeAction, TypeActivity } from "./activity"
import TimeLineContainer from "./TimeLineContainer"
import LinkActivity from "./LinkActivity"
import FAQInputContainer from "./FAQInputContainer"
import ContactContainer from "./ContactContainer"
import ManageActivityHeader from "@/app/components/ManageActivityPage/Header"
import PositionContainer from "./PositionContainer"
import { FAQActivity, ITryActivity, JobPositionsActivity, PhoneActivity, ScheduleActivity } from "@/app/utils/ManageActivityPage/activity"
import { useSearchParams } from "next/navigation"

interface ManageActivityPageProps {
  typeActivity: TypeActivity,
  typeAction: TypeAction,
  activity?: ITryActivity;
}


export default function ManageActivityPage({ typeActivity, typeAction, activity }: ManageActivityPageProps) {
  const { register, setValue, watch, handleSubmit, errors, onSubmit } = useManageActivity({ typeActivity, typeAction, activity })

  const radioData = [
    {
      name: "บุคคลภายนอก",
      value: "outsider"
    },
    {
      name: "บุคคลภายใน",
      value: "insider"
    },
    {
      name: "ทั้งหมด",
      value: "all"
    },
  ]

  return (
    <>
      <p className="h1 font-bold text-2xl w-full border-b-2 border-color-primary py-4">{typeAction === "add" ? "สร้าง" : "แก้ไข"}กิจกรรมสำหรับ{typeActivity === "staff" ? "สต๊าฟ" : "ผู้เข้าร่วม"}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-16">
        <ManageActivityHeader register={register} errors={errors} watch={watch} formKeyFile="imageUrl" setValue={setValue} />
        <ITryInput type="radio" register={register("visibility")} radioData={radioData} defaultIndex={0} showError={!!errors.visibility} name="visibility" label="การมองเห็น" required />
        <ITryInput type="richText" showError={false} label="รายละเอียกิจกรรม" setValue={setValue} value={watch("activityDetails")} fieldName="activityDetails" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-16">
            <TimeLineContainer label="กำหนดการกิจกรรม" schedule={watch("schedule") as ScheduleActivity[] || []} register={register} setValue={setValue} errors={errors} />
            <ContactContainer label="ช่องทางการติดต่อ" phoneData={watch("phone") as PhoneActivity[] || []} register={register} setValue={setValue} errors={errors} />
          </div>
          <div className="flex flex-col gap-16">
            <LinkActivity label="ลิงก์กิจกรรม" register={register} />
            <FAQInputContainer label="FAQ" faqData={watch("faq") as FAQActivity[] || []} register={register} setValue={setValue} errors={errors} />
            {(typeActivity === "staff") && (
              <PositionContainer label="ตำแหน่งที่เปิดรับสมัคร" jobPositions={watch("jobPositions") as JobPositionsActivity[] || []} register={register} setValue={setValue} errors={errors} />
            )}
          </div>
        </div>
        <ITryButton type="submit" customPositionClassName="mt-24" fullWidth>{typeAction === "add" ? "สร้าง" : "แก้ไข" }กิจกรรม</ITryButton>
      </form>
    </>
  )
}