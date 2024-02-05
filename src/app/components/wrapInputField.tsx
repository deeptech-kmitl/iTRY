
interface WrappedInputField {
  elementIsWrapped: JSX.Element | JSX.Element[]
  props: any
}

export default function WrapInputField({ elementIsWrapped, props }: WrappedInputField) {

  const defaultLabelClassName = "text-white font-bold text-l"

  return (
    <div className="flex flex-col">
      <div className="label">
        {props.label && (
          <p className={`${defaultLabelClassName} ${props.customLabelClassName}`}>{props.label} {props.required && <span className="text-red-500">*</span>}</p>
        )}
      </div>
      {elementIsWrapped}
      {props.showError && <p className="text-red-600 text-xs mt-2">{props.errorMessage}</p>}
    </div>
  )
}