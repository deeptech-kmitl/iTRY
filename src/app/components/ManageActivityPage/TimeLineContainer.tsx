import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { WrappedInputProps } from "../global"
import WrapInputField from "../wrapInputField"
import TimeLineInput from "./TimeLineInput"
import ITryButton from "../Button";
import { ScheduleActivity } from "@/app/utils/ManageActivityPage/activity";

interface TimeLineContainerProps extends WrappedInputProps {
  schedule: ScheduleActivity[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

export default function TimeLineContainer(props: TimeLineContainerProps) {

  const addSchedule = () => {
    const newSchedule: ScheduleActivity = {
      date: "",
      title: "",
      details: "",
    }
    
    const mergedSchedule: ScheduleActivity[] = [...props?.schedule, newSchedule]
    props.setValue("schedule", mergedSchedule)

  }

  const removeSchedule = (index: number) => {
    let copySchedule = [...props?.schedule];
    copySchedule.splice(index, 1);
    props.setValue("schedule", copySchedule);

  }
  

  const timeLineElement = (
    <div className="flex flex-col gap-4">
      {props?.schedule?.map((data, index) => (
        <TimeLineInput key={index} {...data} index={index} register={props.register} errors={props.errors} removeSchedule={removeSchedule} />
      ))}
      <ITryButton onClick={addSchedule} customWidthClassName="w-full md:w-fit" >เพิ่มไทม์ไลน์</ITryButton>
    </div>
  )

  return (
    <WrapInputField elementIsWrapped={timeLineElement} props={props} />
  )
}