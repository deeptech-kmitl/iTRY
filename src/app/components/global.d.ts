import { ReactNode } from "react";

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
  showError: boolean;
  errorMessage?: string;
} & (NormalProps | CheckBoxProps | RadioProps | FileProps | DateProps | SearchProps)

type NormalProps = {
  type: "text" | "number" | "password",
  label?: string;
  placeholder?: string
  register: UseFormRegister<any>;
  size?: "tiny" | "small" | "medium" | "large"
}

type CheckBoxProps = {
  type: "checkbox"
}

type RadioProps = {
  type: "radio"
  label?: string;
  placeholder?: string
}

type FileProps = {
  type: "file"
}

type DateProps = {
  type: "date"
}

type SearchProps = {
  type: "search"
}
