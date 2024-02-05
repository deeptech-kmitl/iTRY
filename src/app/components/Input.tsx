'use client'
import ITryRichText from "./RichText";
import { DateProps, ITryInputProps, NormalProps, InputField, RadioProps, RichTextProps } from "./global";
import WrapInputField from "./wrapInputField";

export default function ITryInput(props: ITryInputProps) {

  const defaultInputFieldClassName = "focus:outline-none input input-bordered w-full"

  const renderNormalInput = () => {
    const normalInputSize = {
      "tiny": "input-xs",
      "small": "input-sm",
      "medium": "input-md",
      "large": "input-lg",
    }
    const { placeholder, size = "small", customInputClassName, register } = props as NormalProps;

    const textFieldElement = <input {...register} placeholder={placeholder} className={`${defaultInputFieldClassName} ${normalInputSize[size]} ${customInputClassName}`} />

    return (
      <WrapInputField elementIsWrapped={textFieldElement} props={props} />
    )
  }

  const renderDateInput = () => {

    const { customInputClassName, register } = props as DateProps;

    const dateElement = <input type="date" {...register} className={`${defaultInputFieldClassName} ${customInputClassName}`} />

    return (
      <WrapInputField elementIsWrapped={dateElement} props={props} />
    )
  }

  const renderRadioInput = () => {
    const { customInputClassName, radioData, name: nameRadio, defaultIndex, register } = props as RadioProps;

    const radioElement = (name: string, value: string, index: number) => {
      return (
        <div className="flex gap-1 items-centerr">
          <input
            type="radio" className={`radio ${customInputClassName}`}
            value={value}
            name={nameRadio}
            defaultChecked={defaultIndex === index}
            {...register}
          />
          {name}
        </div>
      )
    }

    const renderRadioElements = (
      <div className="flex gap-2">
        {radioData.map((data, index) => radioElement(data.name, data.value, index))}
      </div>
    )
 
    return <WrapInputField elementIsWrapped={renderRadioElements} props={props} />

  }

  const renderRichText = () => {
    const { setValue, value, fieldName } = props as RichTextProps
    
    console.log("fieldName1 as", fieldName)
    
    const richTextElement = <ITryRichText value={value} setValue={setValue} fieldName={fieldName} />
    return <WrapInputField elementIsWrapped={richTextElement} props={props} />
  }

  const renderInput = () => {
    switch (props.type) {
      case "text":
      case "number":
      case "password":
        return renderNormalInput();
      case "checkbox":
        return <input {...props} />;
      case "radio":
        return renderRadioInput();
      case "file":
        return <input {...props} />;
      case "date":
        return renderDateInput();
      case "search":
        return <input {...props} />;
      case "richText":
        return renderRichText();
      default:
        return null; // Handle unknown types or provide a default component
    }
  }
  return <>{renderInput()}</>
}