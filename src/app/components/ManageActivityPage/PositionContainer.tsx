import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { WrappedInputProps } from "../global";
import PositionInput from "./PositionInput";
import ITryButton from "../Button";
import WrapInputField from "../WrapInputField";
import { JobPositionsActivity } from "@/app/utils/ManageActivityPage/activity";


interface PositionContainerProps extends WrappedInputProps {
  jobPositions: JobPositionsActivity[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

export default function PositionContainer(props: PositionContainerProps) {

  const addJobPosition = () => {
    const newPosition: JobPositionsActivity = {
      name: "",
      amount: NaN,
    }
    
    const mergedPosition: JobPositionsActivity[] = [...props?.jobPositions, newPosition]
    props.setValue("jobPositions", mergedPosition)

  }

  const removeJobPositions = (index: number) => {
    let copyJobPositions = [...props?.jobPositions];
    copyJobPositions.splice(index, 1);
    props.setValue("jobPositions", copyJobPositions);

  }
  

  const timeLineElement = (
    <div className="flex flex-col gap-4">
      {props?.jobPositions?.map((data, index) => (
        <PositionInput key={index} index={index} {...data} register={props.register} errors={props.errors} removeJobPositions={removeJobPositions}  />
      ))}
      <ITryButton onClick={addJobPosition} customWidthClassName="w-full md:w-fit" >เพิ่มตำแหน่งที่รับสมัคร</ITryButton>
    </div>
  )

  return (
    <WrapInputField elementIsWrapped={timeLineElement} props={props} />
  )
}