import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import ITryInput from "../Input";
import ITryButton from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface PositionError {
  name?: FieldError;
  amount?: FieldError;
}

export interface PositionInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  index: number;
  removeJobPositions: (index: number) => void;
}

export default function PositionInput({ index, register, errors, removeJobPositions }: PositionInputProps) {

  const positionErrors = errors?.jobPositions as PositionError[] | undefined;

  return (
    <div className="flex flex-col divide-x-2">
      <div className="label font-bold">
        <p>ตำแหน่งที่ {index + 1} <span className="text-red-500">*</span></p>
      </div>
      <div className="grid grid-cols-12 gap-4 border-color-primary">
        <div className="col-span-11 flex flex-col gap-4 mt-2">
          <ITryInput type="text" register={register(`jobPositions[${index}].name`)} showError={!!positionErrors?.[index]?.name} errorMessage={positionErrors?.[index]?.name?.message as string} placeholder="ชื่อตำแหน่งที่เปิดรับสมัคร" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" size="medium" />
          <ITryInput type="number" register={register(`jobPositions[${index}].amount`)} showError={!!positionErrors?.[index]?.amount} errorMessage={positionErrors?.[index]?.amount?.message as string} size="medium" placeholder="จำนวนที่เปิดรับสมัคร (คน)" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" />
        </div>
        <div className="col-span-1 mt-2">
          <ITryButton customClassName="bg-red-500 hover:bg-red-600 text-white " onClick={() => removeJobPositions(index)}>
            <FontAwesomeIcon icon={faTrash} />
          </ITryButton>
        </div>
      </div>
    </div>
  )
}