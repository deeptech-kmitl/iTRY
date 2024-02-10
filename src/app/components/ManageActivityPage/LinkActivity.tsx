import { UseFormRegister } from "react-hook-form";
import ITryInput from "../Input";
import WrapInputField from "../WrapInputField";

interface LinkActivityProps {
  label?: string;
  register: UseFormRegister<any>;
}

export default function LinkActivity(props: LinkActivityProps ) {

  const linkActivityElement = (
    <div className="flex flex-col gap-4">
      <ITryInput type="text" register={props.register("facebookLink")} label="Facebook" size="medium" placeholder="https://www.facebook.com/fbLink" />
      <ITryInput type="text" register={props.register("igLink")} label="Instagram" size="medium" placeholder="https://www.instagram.com/igLink" />
      <ITryInput type="text" register={props.register("registerLink")} label="ลิงก์สมัครกิจกรรม" size="medium" placeholder="https://www.registerLink.com" />
    </div>
  )

  return (
    <WrapInputField elementIsWrapped={linkActivityElement} props={props} />
  )
}