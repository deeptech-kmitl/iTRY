import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import ITryInput from "../Input";

interface PositionError {
  name?: FieldError;
  amount?: FieldError;
}

export interface PositionInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  index: number;
}

export default function PositionInput({ index, register, errors }: PositionInputProps) {

  const positionErrors = errors?.position as PositionError[] | undefined;

  return (
    <div className="flex flex-col divide-x-2">
      <div className="label font-bold">
        <p>ตำแหน่งที่ {index + 1} <span className="text-red-500">*</span></p>
      </div>
      <div className="flex flex-col gap-4 mt-2 border-color-primary">
        <ITryInput type="text" register={register(`position[${index}].name`)} showError={!!positionErrors?.[index]?.name} errorMessage={positionErrors?.[index]?.name?.message as string} placeholder="ชื่อตำแหน่งที่เปิดรับสมัคร" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" size="medium" />
        <ITryInput type="number" register={register(`position[${index}].amount`)} showError={!!positionErrors?.[index]?.amount} errorMessage={positionErrors?.[index]?.amount?.message as string} size="medium" placeholder="จำนวนที่เปิดรับสมัคร (คน)" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" />
      </div>
    </div>
  )
}