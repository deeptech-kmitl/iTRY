'use client'
import { ITryModalProps } from "./global";

export default function ITryModal({
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  customClassName,
  content,
  actionButton,
  alertHeader
}: ITryModalProps) {
  return (
    <>
      <dialog className="modal bg-black bg-opacity-60" open={isOpen}>
        <div className={`p-16 modal-box rounded-none shadow-none bg-modal ${customClassName}`}>
          {alertHeader}
          <h3 className="font-bold text-2xl pt-8">{title}</h3>
          <div className="mt-8">
            {content}
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              {actionButton}
            </form>
          </div>
          {showCloseButton && (
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
          )}
        </div>
        <form method="dialog" className="modal-backdrop" onClick={onClose}>
        </form>
      </dialog>
    </>
  )
}