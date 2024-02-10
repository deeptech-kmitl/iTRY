import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { WrappedInputProps } from "../global"
import WrapInputField from "../WrapInputField"
import TimeLineInput from "./TimeLineInput"
import ITryButton from "../Button";

interface TimeLineContainerProps extends WrappedInputProps {
  timeLineData: TimeLineData[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

export interface TimeLineData {
  date: string;
  title: string;
  description: string;
  index: number;
}

export default function TimeLineContainer(props: TimeLineContainerProps) {

  const addTimeLine = () => {
    const currentIndex = props?.timeLineData?.length
    const newTimeLine: TimeLineData = {
      date: "",
      title: "",
      description: "",
      index: currentIndex
    }
    
    const mergedTimeLine: TimeLineData[] = [...props?.timeLineData, newTimeLine]
    props.setValue("timeLine", mergedTimeLine)


  }
  

  const timeLineElement = (
    <div className="flex flex-col gap-4">
      {props?.timeLineData?.map((data, index) => (
        <TimeLineInput key={index} {...data} register={props.register} errors={props.errors} />
      ))}
      <ITryButton onClick={addTimeLine} customWidthClassName="w-full md:w-fit" >เพิ่มไทม์ไลน์</ITryButton>
    </div>
  )

  return (
    <WrapInputField elementIsWrapped={timeLineElement} props={props} />
  )
}