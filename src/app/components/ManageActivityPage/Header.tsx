import Image from "next/image";
import ITryInput from "../Input";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import addOneDayToDate from "@/app/utils/addOneDayToDate";

interface ManageActivityHeaderProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  formKeyFile: string;
  setValue: UseFormSetValue<any>;
}


export default function ManageActivityHeader({ register, errors, watch, formKeyFile, setValue }: ManageActivityHeaderProps) {
  console.log('watch ', watch("openDate"))
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="grid items-center">
        <ITryInput type="image" register={register} file={watch(formKeyFile)} formKeyFile={formKeyFile} setValue={setValue} showError={!!errors.imageUrl} errorMessage={errors.imageUrl?.message + ""} label="รูปภาพปกกิจกรรม" required />
      </div>
      <div className="grid h-fit gap-4">
        <ITryInput showError={!!errors.activityName} errorMessage={errors.activityName?.message + ""} type="text" label="ชื่อกิจกรรม" register={register("activityName")} size="medium" required />
        <ITryInput showError={!!errors.openDate} errorMessage={errors.openDate?.message + ""} type="date" label="วันเปิดรับสมัคร" register={register("openDate")} min={new Date().toISOString().split("T")[0]} required   />
        <ITryInput showError={!!errors.closeDate} errorMessage={errors.closeDate?.message + ""} type="date" label="วันปิดรับสมัคร" register={register("closeDate")} min={ addOneDayToDate(watch("openDate"))} required   />
      </div>
    </div>
  )
}