import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import ITryInput from "../Input";

interface FAQError {
  question?: FieldError;
  answer?: FieldError;
}

interface FAQInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  index: number;
}

export default function FAQInput({ index, register, errors }: FAQInputProps) {

  const faqErrors = errors?.faq as FAQError[] | undefined;

  return (
    <div className="flex flex-col divide-x-2">
      <div className="label font-bold">
        <p>คำถามที่ {index + 1} <span className="text-red-500">*</span></p>
      </div>
      <div className="flex flex-col gap-4 mt-2 border-color-primary">
        <ITryInput type="text" register={register(`faq[${index}].question`)} showError={!!faqErrors?.[index]?.question} errorMessage={faqErrors?.[index]?.question?.message as string} customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" size="medium" />
        <ITryInput type="text" register={register(`faq[${index}].answer`)} showError={!!faqErrors?.[index]?.answer} errorMessage={faqErrors?.[index]?.answer?.message as string} size="medium" placeholder="หัวข้อ" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" />
      </div>
    </div>
  )
}