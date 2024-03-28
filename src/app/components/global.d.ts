import { File } from "buffer";
import { ReactNode } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

export type ITryButtonProps = {
  children?: React.ReactNode
  type?: "default" | "outline" | "submit" | "ghost"
  fullWidth?: boolean
  size?: "large" | "default" | "small" | "tiny",
  disabled?: boolean,
  customClassName?: string,
  customWidthClassName?: string,
  customPositionClassName?: string,
  onClick?: () => void;
  removeDefaultClassName?: boolean;
  confirmEdit?: () => void;
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
  name: string | ReactNode,
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
  titleCenter?: boolean;
}

export type WrappedInputProps = {
  showError?: boolean;
  errorMessage?: string;
  required?: boolean;
  label?: string;
  customLabelClassName?: string;
  customErrorClassName?: string;
}

export type ITryInputProps = WrappedInputProps & (NormalProps | CheckBoxProps | RadioProps | FileProps | DateProps | SearchProps | RichTextProps | ImageInputProps)


type NormalProps = {
  type: "text" | "number" | "password" | "phone";
  placeholder?: string;
  size?: "tiny" | "small" | "medium" | "large";
  customInputClassName?: string;
} & (
  {
    noRegister: true;
  } |
  {
    noRegister?: false;
    register: UseFormRegister<any>;
  }
);

type CheckBoxProps = {
  type: "checkbox"
  label?: string;
  checkFunction: (...args: any[]) => void;
  checked: boolean;
} 

type RadioProps = {
  type: "radio"
  radioData: RadioData[];
  defaultIndex: number;
  customInputClassName?: string;
  customContainerClassName?: string;
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
  min ?: string;
  max ?: string;
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

type ImageInputProps = {
  type: "image";
  file: Blob | string;
  register: UseFormRegister<any>;
  formKeyFile: formKeyFile;
  setValue: UseFormSetValue<any>;
}

export type InputField = "text" | "date"

export interface ApiDataList<Type> {
  status: "success",
  data: Type[]
}

export interface ApiError {
  error: unknown,
  status: "error"
}