import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { WrappedInputProps } from "../global";
import ContactInputTelephone from "./ContactInputTelephone";
import ITryButton from "../Button";
import WrapInputField from "../WrapInputField";
import ITryInput from "../Input";

interface PhoneInputContainerProps extends WrappedInputProps {
  phoneData: PhoneData[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

export interface PhoneData {
  phone: string;
  index: number;
}

export default function ContactContainer(props: PhoneInputContainerProps) {
  const addPhone = () => {
    const currentIndex = props?.phoneData?.length
    const newPhone: PhoneData = {
      phone: "",
      index: currentIndex
    }

    const mergedPhone: PhoneData[] = [...props?.phoneData, newPhone]
    props.setValue("phone", mergedPhone)

  }


  const phoneElement = (
    <div className="flex flex-col gap-4">
      {props?.phoneData?.map((data, index) => (
        <ContactInputTelephone key={index} {...data} {...props} />
      ))}
      <ITryButton onClick={addPhone} customWidthClassName="w-full md:w-fit " >เพิ่มเบอร์โทรศัพท์</ITryButton>

      <ITryInput label="อีเมล" type="text" register={props.register(`email`)} showError={!!props.errors?.email} errorMessage={props.errors?.email?.message as string} size="medium" placeholder="username@example.com" />
    </div>
  )

  return (
    <WrapInputField elementIsWrapped={phoneElement} props={props} />
  )
}