import { FieldError, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import ITryInput from "../Input";
import { WrappedInputProps } from "../global";
import ITryButton from "../Button";
import FAQInput from "./FAQInput";
import WrapInputField from "../wrapInputField";
import { FAQActivity } from "@/app/utils/ManageActivityPage/activity";

interface FAQInputContainerProps extends WrappedInputProps {
  faqData: FAQActivity[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

export default function FAQInputContainer(props: FAQInputContainerProps) {

  const addFAQ = () => {
    const newFAQ: FAQActivity = {
      question: "",
      answer: "",
    }

    const mergedFAQ: FAQActivity[] = [...props?.faqData, newFAQ]
    props.setValue("faq", mergedFAQ)

  }

  const removeFAQ = (index: number) => {
    let copyFAQ = [...props?.faqData];
    copyFAQ.splice(index, 1);
    props.setValue("faq", copyFAQ);

  }


  const faqElement = (
    <div className="flex flex-col gap-4">
      {props?.faqData?.map((data, index) => (
        <FAQInput key={index} {...data} register={props.register} errors={props.errors} index={index} removeFAQ={removeFAQ} />
      ))}
      <ITryButton onClick={addFAQ} customWidthClassName="w-full md:w-fit " >เพิ่ม FAQ</ITryButton>
    </div>
  )

  return (
    <WrapInputField elementIsWrapped={faqElement} props={props} />
  )
}