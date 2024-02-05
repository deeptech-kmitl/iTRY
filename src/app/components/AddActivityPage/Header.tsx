import Image from "next/image";
import ITryInput from "../Input";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface AddActivityHeaderProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function AddActivityHeader({register, errors}: AddActivityHeaderProps) {

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="grid">
        <div className="relative w-full h-full border-dashed border-color-primary border-2 flex justify-center items-center cursor-pointer">
          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <p className="text-white">เพิ่มรูปภาพ</p>
          <Image id="selected-image" src="/open_house.png" className="hidden w-full h-full object-cover" alt="Selected Image" width={300} height={300} />
        </div>
      </div>
      <div className="grid">
        <ITryInput showError={!!errors.activityName} errorMessage={errors.activityName?.message + ""} type="text" label="ชื่อกิจกรรม" register={register("activityName")} size="medium" required />
        <ITryInput showError={!!errors.registerDateStart} errorMessage={errors.registerDateStart?.message + ""} type="date" label="วันเปิดรับสมัคร" register={register("registerDateStart")} required   />
        <ITryInput showError={!!errors.registerDateEnd} errorMessage={errors.registerDateEnd?.message + ""} type="date" label="วันปิดรับสมัคร" register={register("registerDateEnd")} required   />
      </div>
    </div>
  )
}