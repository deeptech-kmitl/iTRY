import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import ITryInput from "../Input";
import ITryButton from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface TimeLineError {
  date?: FieldError;
  title?: FieldError;
  details?: FieldError;
}

export interface TimeLineInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  index: number;
  removeSchedule: (index: number) => void;
}

export default function TimeLineInput({ index, register, errors, removeSchedule }: TimeLineInputProps) {

  const timeLineErrors = errors?.schedule as TimeLineError[] | undefined;

  return (
    <div className="flex flex-col divide-x-2">
      <div className="label font-bold">
        <p>ไทม์ไลน์ {index + 1} <span className="text-red-500">*</span></p>
      </div>
      <div className="grid grid-cols-12 gap-4 border-color-primary">
        <div className="col-span-11 flex flex-col gap-4 mt-2">
          <ITryInput type="date" register={register(`schedule[${index}].date`)} showError={!!timeLineErrors?.[index]?.date} errorMessage={timeLineErrors?.[index]?.date?.message as string} customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" />
          <ITryInput type="text" register={register(`schedule[${index}].title`)} showError={!!timeLineErrors?.[index]?.title} errorMessage={timeLineErrors?.[index]?.title?.message as string} size="medium" placeholder="หัวข้อ" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" />
          <ITryInput type="text" register={register(`schedule[${index}].details`)} showError={!!timeLineErrors?.[index]?.details} errorMessage={timeLineErrors?.[index]?.details?.message as string} size="medium" placeholder="รายละเอียด" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" />
        </div>
        <div className="col-span-1 mt-2">
          <ITryButton customClassName="bg-red-500 hover:bg-red-600 text-white " onClick={() => removeSchedule(index)}>
            <FontAwesomeIcon icon={faTrash} />
          </ITryButton>
        </div>
      </div>
    </div>
  )
}