import { toast } from "react-toastify"

type NotificationProps = "error" | "warn" | "info" | "success";

interface ITryToastNotificationProps {
  type: NotificationProps,
  text: string
}

export default async function ITryToastNotification({ type, text }: ITryToastNotificationProps) {
  console.log("call toast notification")
  return toast[type](text, {
    position: "top-center"
  })
}