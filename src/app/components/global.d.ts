import { ReactNode } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

export type ITryButtonProps = {
  children?: React.ReactNode
  type?: "default" | "outline" | "submit"
  fullWidth?: boolean
  size?: "large" | "default" | "small" | "tiny",
  disabled?: boolean,
  customClassName?: string,
  onClick?: () => void;
}

export type ITryDropDownProps = {
  children?: ReactNode
  showOnHover?: boolean
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left-bottom" | "left-top" | "right-bottom" | "right-top"
  customClassNameMain?: string
  customClassNameDropDownContent?: string
  dropdownSize?: "large" | "default" | "small" | "tiny"
  removeBg?: boolean
} & (
    {
      data: DataDropDownProps[];
      customData?: never;
    } |
    {
      data?: never;
      customData: ReactNode;
    }
  );

type DataDropDownProps = {
  name: string,
  function?: () => void;
  customClassName?: string;
}

export type ITryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  showCloseButton?: boolean;
  customClassName?: string;
  actionButton?: ReactNode;
  content?: ReactNode;
  alertHeader?: ReactNode;
}

export type ITryInputProps = {
  showError?: boolean;
  errorMessage?: string;
  required?: boolean;
  label?: string;
  customLabelClassName?: string;
} & (NormalProps | CheckBoxProps | RadioProps | FileProps | DateProps | SearchProps | RichTextProps)

type NormalProps = {
  type: "text" | "number" | "password";
  placeholder?: string;
  size?: "tiny" | "small" | "medium" | "large";
  customInputClassName?: string;
  register: UseFormRegister<any>;

}

type CheckBoxProps = {
  type: "checkbox"
}

type RadioProps = {
  type: "radio"
  radioData: RadioData[];
  defaultIndex: number;
  customInputClassName?: string;
  name: string;
  register: UseFormRegister<any>;

}

interface RadioData {
  name: string;
  value: string;
}

type FileProps = {
  type: "file"
}

type DateProps = {
  type: "date"
  customInputClassName?: string;
  register: UseFormRegister<any>;

}

type SearchProps = {
  type: "search"
}

interface RichTextProps extends RichTextComponentProps {
  type: "richText";
}

type RichTextComponentProps = {
  setValue: UseFormSetValue<any>;
  value: string | undefined;
  fieldName: string;
}

export type InputField = "text" | "date"