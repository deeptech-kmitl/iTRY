'use client'
import Image from "next/image";
import ITryRichText from "./RichText";
import { DateProps, ITryInputProps, NormalProps, InputField, RadioProps, RichTextProps, WrappedInputProps, ImageInputProps, CheckBoxProps } from "./global";
import { ChangeEvent } from "react";
import WrapInputField from "./wrapInputField";

export default function ITryInput(props: ITryInputProps) {

  const defaultInputFieldClassName = "focus:outline-none input input-bordered"

  const renderNormalInput = () => {
    const normalInputSize = {
      "tiny": "input-xs",
      "small": "input-sm",
      "medium": "input-md",
      "large": "input-lg",
    }
    let convertProps = props as NormalProps;
    const { placeholder, size = "small", customInputClassName, type, noRegister } = convertProps;

    const textFieldElement = <input  {...(!noRegister ? (convertProps.register) : {})} type={type} placeholder={placeholder} className={`${defaultInputFieldClassName} ${normalInputSize[size]} ${customInputClassName}`} />

    return (
      <WrapInputField elementIsWrapped={textFieldElement} props={props as WrappedInputProps} />
    )
  }

  const renderDateInput = () => {

    const { customInputClassName, register, min, max } = props as DateProps;

    const dateElement = <input type="date" {...register} className={`${defaultInputFieldClassName} ${customInputClassName}`}  min={min} max={max} />

    return (
      <WrapInputField elementIsWrapped={dateElement} props={props as WrappedInputProps} />
    )
  }

  const renderRadioInput = () => {
    const { customInputClassName, customContainerClassName, radioData, name: nameRadio, defaultIndex, register } = props as RadioProps;

    const radioElement = (name: string, value: string, index: number) => {
      return (
        <div className={`flex gap-2 items-center`} key={index}>
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
      <div className={`flex gap-4 ${customContainerClassName}`}>
        {radioData.map((data, index) => radioElement(data.name, data.value, index))}
      </div>
    )
 
    return <WrapInputField elementIsWrapped={renderRadioElements} props={props as WrappedInputProps} />

  }

  const renderRichText = () => {
    const { setValue, value, fieldName } = props as RichTextProps
    const richTextElement = <ITryRichText value={value} setValue={setValue} fieldName={fieldName} />
    return <WrapInputField elementIsWrapped={richTextElement} props={props as WrappedInputProps} />
  }

  const renderImageInput = () => {

    const { file, register, formKeyFile, setValue } = props as ImageInputProps;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e?.target?.files?.[0];
      setValue(formKeyFile, selectedFile);
    };

    const imageInputElement = (
      <div className={`relative w-full ${!file && "border-dashed aspect-video border-color-primary border-2"} flex justify-center items-center cursor-pointer`}>
        <input {...register} accept="image/*" type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        {file ? (
          <Image priority id="selected-image" src={typeof (file) === "string" ? file : URL.createObjectURL(file)} className="w-full object-cover aspect-video object-center" alt="" width={300} height={300} />
        ) : (
            <p className="text-white">เพิ่มรูปภาพ</p>
        )}
      </div>
    )

    return <WrapInputField elementIsWrapped={imageInputElement} props={props as WrappedInputProps} />

  }

  const renderCheckboxInput = () => {
    const { label, checkFunction, checked } = props as CheckBoxProps;
    return (
      <div className="form-control">
        <label className="label cursor-pointer justify-center gap-2">
          <input type="checkbox" checked={checked} onChange={checkFunction} className="checkbox checkbox-sm" />
          <span className="label-text text-white">{ label }</span>
        </label>
      </div>
    )
   }

  const renderInput = () => {
    switch (props.type) {
      case "text":
      case "number":
      case "password":
        return renderNormalInput();
      case "checkbox":
        return renderCheckboxInput();
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
      case "image":
        return renderImageInput();
      default:
        return null; // Handle unknown types or provide a default component
    }
  }
  return <>{renderInput()}</>
}