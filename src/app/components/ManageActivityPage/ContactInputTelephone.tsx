import { FieldError, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import ITryInput from "../Input";
import ITryButton from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ContactError {
  phone?: FieldError;
}

interface ContactInputTelephoneProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  index: number;
  removePhone: (index: number) => void;
}

export default function ContactInputTelephone({ index, register, errors, removePhone }: ContactInputTelephoneProps) {

  const phoneErrors = errors?.phone as ContactError[] | undefined;

  return (
    <div className="flex flex-col divide-x-2">
      <div className="label font-bold">
        <p>เบอร์โทรศัพท์ที่ {index + 1} <span className="text-red-500">*</span></p>
      </div>
      <div className="grid grid-cols-12 gap-4 border-color-primary">
        <div className="col-span-11 flex flex-col gap-4 mt-2">
          <ITryInput placeholder="0xxxxxxxxx" type="number" register={register(`phone[${index}].phone`)} showError={!!phoneErrors?.[index]?.phone} errorMessage={phoneErrors?.[index]?.phone?.message as string} customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" size="medium" />
        </div>
        <div className="col-span-1 mt-2">
          <ITryButton customClassName="bg-red-500 hover:bg-red-600 text-white " onClick={() => removePhone(index)}>
            <FontAwesomeIcon icon={faTrash} />
          </ITryButton>
        </div>
      </div>
    </div>
  )
}