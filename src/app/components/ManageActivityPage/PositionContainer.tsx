import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { WrappedInputProps } from "../global";
import PositionInput from "./PositionInput";
import ITryButton from "../Button";
import WrapInputField from "../WrapInputField";


interface PositionContainerProps extends WrappedInputProps {
  positionData: PositionData[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

export interface PositionData {
  name: string;
  amount: number;
  index: number;
}

export default function PositionContainer(props: PositionContainerProps) {

  const addPosition = () => {
    const currentIndex = props?.positionData?.length
    const newPosition: PositionData = {
      name: "",
      amount: NaN,
      index: currentIndex,
    }
    
    const mergedPosition: PositionData[] = [...props?.positionData, newPosition]
    props.setValue("position", mergedPosition)

  }
  

  const timeLineElement = (
    <div className="flex flex-col gap-4">
      {props?.positionData?.map((data, index) => (
        <PositionInput key={index} {...data} register={props.register} errors={props.errors} />
      ))}
      <ITryButton onClick={addPosition} customWidthClassName="w-full md:w-fit" >เพิ่มตำแหน่งที่รับสมัคร</ITryButton>
    </div>
  )

  return (
    <WrapInputField elementIsWrapped={timeLineElement} props={props} />
  )
}