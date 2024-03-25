import { toast } from "react-toastify"

type NotificationProps = "error" | "warn" | "info" | "success";

interface ITryToastNotificationProps {
  type: NotificationProps,
  text: string
}

export default async function ITryToastNotification({ type, text }: ITryToastNotificationProps) {
  return toast[type](text, {
    position: "top-center"
  })
}