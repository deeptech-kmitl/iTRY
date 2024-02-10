import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import ITryInput from "../Input";

interface TimeLineError {
  date?: FieldError;
  title?: FieldError;
  description?: FieldError;
}

export interface TimeLineInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  index: number;
}

export default function TimeLineInput({ index, register, errors }: TimeLineInputProps) {

  const timeLineErrors = errors?.timeLine as TimeLineError[] | undefined;

  return (
    <div className="flex flex-col divide-x-2">
      <div className="label font-bold">
        <p>ไทม์ไลน์ {index + 1} <span className="text-red-500">*</span></p>
      </div>
      <div className="flex flex-col gap-4 mt-2 border-color-primary">
        <ITryInput type="date" register={register(`timeLine[${index}].date`)} showError={!!timeLineErrors?.[index]?.date} errorMessage={timeLineErrors?.[index]?.date?.message as string} customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" />
        <ITryInput type="text" register={register(`timeLine[${index}].title`)} showError={!!timeLineErrors?.[index]?.title} errorMessage={timeLineErrors?.[index]?.title?.message as string} size="medium" placeholder="หัวข้อ" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" />
        <ITryInput type="text" register={register(`timeLine[${index}].description`)} showError={!!timeLineErrors?.[index]?.description} errorMessage={timeLineErrors?.[index]?.description?.message as string} size="medium" placeholder="รายละเอียด" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" />
      </div>
    </div>
  )
}