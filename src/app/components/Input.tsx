'use client'
import { ITryInputProps, NormalProps } from "./global";

export default function ITryInput(props: ITryInputProps) {

  const renderNormalInput = () => {
    const normalInputSize = {
      "tiny": "input-xs",
      "small": "input-sm",
      "medium": "input-md",
      "large": "input-lg",
    }
    const { register, label, placeholder, size = "small" } = props as NormalProps;
    return (
      <>
        <div className="flex flex-col">
          <div className="label">
            <span className="label-text text-white text-bold">{label}</span>
          </div>
          <input {...register} placeholder={placeholder} className={`focus:outline-none input input-bordered w-full ${normalInputSize[size]}`} />
          {props.showError && <p className="text-red-500 text-xs mt-2">{props.errorMessage}</p>}
        </div>
      </>
    )
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
        return <input {...props} />;
      case "file":
        return <input {...props} />;
      case "date":
        return <input {...props} />;
      case "search":
        return <input {...props} />;
      default:
        return null; // Handle unknown types or provide a default component
    }
  }
  return <>{renderInput()}</>
}