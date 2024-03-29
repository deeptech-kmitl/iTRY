import { ITryDropDownProps } from "./global"
import { Fragment, ReactNode } from 'react';

export default function ITryDropDown(props: ITryDropDownProps) {

  const { position = "bottom-left", showOnHover = false, children, customClassNameMain, customClassNameDropDownContent, dropdownSize = "default", removeBg = false } = props

  const getDropDownPosition = () => {
    if (position === "bottom-left") return "dropdown-end"
    if (position === "top-left") return "dropdown-top dropdown-end"
    if (position === "top-right") return "dropdown-top"
    if (position === "right-bottom") return "dropdown-right"
    if (position === "right-top") return "dropdown-right dropdown-end"
    if (position === "left-bottom") return "dropdown-left"
    if (position === "left-top") return "dropdown-left dropdown-end"
  }

  const getHowToShowDropdown = () => {
    if (showOnHover) return "dropdown-hover"
  }

  const getDropDownSize = () => {
    if (dropdownSize === "large") return "menu-lg"
    if (dropdownSize === "small") return "menu-sm"
    if (dropdownSize === "tiny") return "menu-xs"
  }

  const renderDataDropDown = () => {
    if (props.customData) return props.customData;
    if (props.data) return (
      <>
        {props.data.map((data, index) => {
          if (typeof data.name === "string") {
            return (
              <li key={index} onClick={data.function} className={`ml-0 ${data.customClassName}`}><a className="flex justify-center">{data.name}</a></li>
            )
          }
          return (
            <Fragment key={index}>
              {data.name}
            </Fragment>
          )
        })}
      </>
    )
  }

  const getClassNameButton = () => {
    if (!removeBg) return "btn rounded-xl"
  }

  return (
    <>
      <div className={`dropdown ${getDropDownPosition()} ${getHowToShowDropdown()}`}>
        <div role="button" tabIndex={0} className={`font-medium text-white ${getClassNameButton()} ${customClassNameMain}`}>
          {children}
        </div>
        <ul tabIndex={0} className={`mt-3 z-[100] p-2 shadow menu dropdown-content rounded-box w-max bg-base-100 ${getDropDownSize()} ${customClassNameDropDownContent}`}>
          {renderDataDropDown()}
        </ul>
      </div>
    </>
  )
}