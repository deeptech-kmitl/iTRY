import Image from "next/image";
import ITryInput from "../Input";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface ManageActivityHeaderProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  formKeyFile: string;
  setValue: UseFormSetValue<any>;
}

export default function ManageActivityHeader({ register, errors, watch, formKeyFile, setValue }: ManageActivityHeaderProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="grid items-center">
        <ITryInput type="image" register={register} file={watch(formKeyFile)} formKeyFile={formKeyFile} setValue={setValue} showError={!!errors.image} errorMessage={errors.image?.message + ""} label="รูปภาพปกกิจกรรม" required />
      </div>
      <div className="grid h-fit gap-4">
        <ITryInput showError={!!errors.activityName} errorMessage={errors.activityName?.message + ""} type="text" label="ชื่อกิจกรรม" register={register("activityName")} size="medium" required />
        <ITryInput showError={!!errors.registerDateStart} errorMessage={errors.registerDateStart?.message + ""} type="date" label="วันเปิดรับสมัคร" register={register("registerDateStart")} required   />
        <ITryInput showError={!!errors.registerDateEnd} errorMessage={errors.registerDateEnd?.message + ""} type="date" label="วันปิดรับสมัคร" register={register("registerDateEnd")} required   />
      </div>
    </div>
  )
}