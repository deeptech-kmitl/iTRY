import { ITryButtonProps } from "./global";


export default function ITryButton({
  children,
  type = "default",
  fullWidth = false,
  size = "default",
  disabled = false,
  onClick,
  customClassName
}: ITryButtonProps) {


  const getTypeButton = () => {
    if (type === "outline") return "btn-outline "
  }

  const getFullWidthButton = () => {
    if (fullWidth) return "btn-block "
  }

  const getSizeButton = () => {
    if (size === "large") return "btn-lg "
    if (size === "small") return "btn-sm "
    if (size === "tiny") return "btn-xs "
  }

  const getDisabled = () => {
    if (disabled) return "btn-disabled "
  }

  const getClassName = () => {
    let className = "btn "
    className += customClassName ? "" : "text-white bg-linear-blue "
    className += getTypeButton() || ""
    className += getFullWidthButton() || ""
    className += getSizeButton() || ""
    className += getDisabled() || ""
    className += customClassName
    return className
  }

  return (
    <>
      <button type={type === "submit" ? "submit" : "button"} className={getClassName()} onClick={onClick}>{children}</button>
    </>
  )
}