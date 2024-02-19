import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { WrappedInputProps } from "../global";
import ContactInputTelephone from "./ContactInputTelephone";
import ITryButton from "../Button";
import WrapInputField from "../wrapInputField";
import ITryInput from "../Input";
import { PhoneActivity } from "@/app/utils/ManageActivityPage/activity";

interface PhoneInputContainerProps extends WrappedInputProps {
  phoneData: PhoneActivity[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}


export default function ContactContainer(props: PhoneInputContainerProps) {
  const addPhone = () => {
    const newPhone: PhoneActivity = {
      phone: "",
    }

    const mergedPhone: PhoneActivity[] = [...props?.phoneData, newPhone]
    props.setValue("phone", mergedPhone)

  }

  const removePhone = (index: number) => {
    let copyPhone = [...props?.phoneData];
    copyPhone.splice(index, 1);
    props.setValue("schedule", copyPhone);

  }


  const phoneElement = (
    <div className="flex flex-col gap-4">
      {props?.phoneData?.map((data, index) => (
        <ContactInputTelephone key={index} index={index} {...data} {...props} removePhone={removePhone} />
      ))}
      <ITryButton onClick={addPhone} customWidthClassName="w-full md:w-fit " >เพิ่มเบอร์โทรศัพท์</ITryButton>

      <ITryInput label="อีเมล" type="text" register={props.register(`email`)} showError={!!props.errors?.email} errorMessage={props.errors?.email?.message as string} size="medium" placeholder="username@example.com" />
    </div>
  )

  return (
    <WrapInputField elementIsWrapped={phoneElement} props={props} />
  )
}