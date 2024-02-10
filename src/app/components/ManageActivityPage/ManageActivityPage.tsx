'use client'
import AddActivityHeader from "@/app/components/ManageActivityPage/Header"
import ITryButton from "@/app/components/Button"
import ITryInput from "@/app/components/Input"
import useManageActivity from "@/app/utils/ManageActivityPage/useManageActivity"
import { TypeAction, TypeActivity } from "./activity"
import TimeLineContainer, { TimeLineData } from "./TimeLineContainer"
import LinkActivity from "./LinkActivity"
import FAQInputContainer, { FAQData } from "./FAQInputContainer"
import ContactContainer, { PhoneData } from "./ContactContainer"
import ManageActivityHeader from "@/app/components/ManageActivityPage/Header"
import PositionContainer, { PositionData } from "./PositionContainer"

interface ManageActivityPageProps {
  typeActivity: TypeActivity,
  typeAction: TypeAction
}


export default function ManageActivityPage({ typeActivity, typeAction }: ManageActivityPageProps) {

  const { register, setValue, watch, handleSubmit, errors, onSubmit } = useManageActivity({typeActivity, typeAction})

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
      <p className="h1 font-bold text-2xl w-full border-b-2 border-color-primary py-4">สร้างกิจกรรมสำหรับ{typeActivity === "staff" ? "สต๊าฟ" : "ผู้เข้าร่วม"}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-16">
        <ManageActivityHeader register={register} errors={errors} watch={watch} formKeyFile="image" setValue={setValue} />
        <ITryInput type="radio" register={register("viewBy")} radioData={radioData} defaultIndex={0} showError={!!errors.viewBy} name="viewBy" label="การมองเห็น" required />
        <ITryInput type="richText" showError={false} label="รายละเอียกิจกรรม" setValue={setValue} value={watch("activityDetail")} fieldName="activityDetail" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-16">
            <TimeLineContainer label="กำหนดการกิจกรรม" timeLineData={watch("timeLine") as TimeLineData[] || []} register={register} setValue={setValue} errors={errors} />
            <ContactContainer label="ช่องทางการติดต่อ" phoneData={watch("phone") as PhoneData[] || []} register={register} setValue={setValue} errors={errors} />
          </div>
          <div className="flex flex-col gap-16">
            <LinkActivity label="ลิงก์กิจกรรม" register={register} />
            <FAQInputContainer label="FAQ" faqData={watch("faq") as FAQData[] || []} register={register} setValue={setValue} errors={errors} />
            {(typeActivity === "staff") && (
              <PositionContainer label="ตำแหน่งที่เปิดรับสมัคร" positionData={watch("position") as PositionData[] || []} register={register} setValue={setValue} errors={errors} />
            )}
          </div>
        </div>
        <ITryButton type="submit" customPositionClassName="mt-24" fullWidth>สร้างกิจกรรม</ITryButton>

      </form>
    </>
  )
}