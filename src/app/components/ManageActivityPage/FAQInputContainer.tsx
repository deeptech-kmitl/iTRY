import { FieldError, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import ITryInput from "../Input";
import { WrappedInputProps } from "../global";
import ITryButton from "../Button";
import FAQInput from "./FAQInput";
import WrapInputField from "../WrapInputField";

interface FAQInputContainerProps extends WrappedInputProps {
  faqData: FAQData[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

export interface FAQData {
  question: string;
  answer: string;
  index: number;
}

export default function FAQInputContainer(props: FAQInputContainerProps) {

  const addFAQ = () => {
    const currentIndex = props?.faqData?.length
    const newFAQ: FAQData = {
      question: "",
      answer: "",
      index: currentIndex
    }

    const mergedFAQ: FAQData[] = [...props?.faqData, newFAQ]
    props.setValue("faq", mergedFAQ)

  }


  const faqElement = (
    <div className="flex flex-col gap-4">
      {props?.faqData?.map((data, index) => (
        <FAQInput key={index} {...data} register={props.register} errors={props.errors} />
      ))}
      <ITryButton onClick={addFAQ} customWidthClassName="w-full md:w-fit " >เพิ่ม FAQ</ITryButton>
    </div>
  )

  return (
    <WrapInputField elementIsWrapped={faqElement} props={props} />
  )
}