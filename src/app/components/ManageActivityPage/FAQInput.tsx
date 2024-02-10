import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import ITryInput from "../Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ITryButton from "../Button";

interface FAQError {
  question?: FieldError;
  answer?: FieldError;
}

interface FAQInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  index: number;
  removeFAQ: (index: number) => void;
}

export default function FAQInput({ index, register, errors, removeFAQ }: FAQInputProps) {

  const faqErrors = errors?.faq as FAQError[] | undefined;

  return (
    <div className="flex flex-col divide-x-2">
      <div className="label font-bold">
        <p>คำถามที่ {index + 1} <span className="text-red-500">*</span></p>
      </div>
      <div className="grid grid-cols-12 gap-4 border-color-primary">
        <div className="col-span-11 flex flex-col gap-4 mt-2">
          <ITryInput type="text" register={register(`faq[${index}].question`)} showError={!!faqErrors?.[index]?.question} errorMessage={faqErrors?.[index]?.question?.message as string} placeholder="คำถาม" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" size="medium" />
          <ITryInput type="text" register={register(`faq[${index}].answer`)} showError={!!faqErrors?.[index]?.answer} errorMessage={faqErrors?.[index]?.answer?.message as string} size="medium" placeholder="คำตอบ" customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" />
        </div>
        <div className="col-span-1 mt-2">
          <ITryButton customClassName="bg-red-500 hover:bg-red-600 text-white " onClick={() => removeFAQ(index)}>
            <FontAwesomeIcon icon={faTrash} />
          </ITryButton>
        </div>
      </div>
    </div>
  )
}