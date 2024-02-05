'use client'
import AddActivityHeader from "@/app/components/AddActivityPage/Header"
import ITryButton from "@/app/components/Button"
import ITryInput from "@/app/components/Input"
import useAddActivity from "@/app/utils/AddActivityPage/useAddActivity"

interface AddtActivityPageProps {
  params: TypeActivity
}

type TypeActivity = {
  type: "staff" | "camper"
}

export default function AddtActivityPage({ params }: AddtActivityPageProps) {
  const typeActivity = params.type

  const { register, setValue, getValues, handleSubmit, errors, onSubmit } = useAddActivity()

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
        <AddActivityHeader register={register} errors={errors} />
        <ITryInput type="radio" register={register("viewBy")} radioData={radioData} defaultIndex={0} showError={!!errors.viewBy} name="viewBy" label="การมองเห็น" required />
        <ITryInput type="richText" showError={false} label="รายละเอียกิจกรรม" setValue={setValue} value={getValues("activityDetail")} fieldName="activityDetail" />
        <ITryButton type="submit">สร้างกิจกรรม</ITryButton>

      </form>
    </>
  )
}