import { FieldError, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import ITryInput from "../Input";

interface ContactError {
  phone?: FieldError;
}

interface ContactInputTelephoneProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  index: number;
}

export default function ContactInputTelephone({ index, register, errors }: ContactInputTelephoneProps) {

  const phoneErrors = errors?.phone as ContactError[] | undefined;

  return (
    <div className="flex flex-col divide-x-2">
      <div className="label font-bold">
        <p>เบอร์โทรศัพท์ที่ {index + 1} <span className="text-red-500">*</span></p>
      </div>
      <div className="flex flex-col gap-4 mt-2 border-color-primary">
        <ITryInput placeholder="0xxxxxxxxx" type="number" register={register(`phone[${index}].phone`)} showError={!!phoneErrors?.[index]?.phone} errorMessage={phoneErrors?.[index]?.phone?.message as string} customInputClassName="ml-4 w-auto" customErrorClassName="ml-4" size="medium" />
      </div>
    </div>
  )
}