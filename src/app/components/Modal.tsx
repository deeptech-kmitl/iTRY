'use client'
import { ITryModalProps } from "./global";

export default function ITryModal({
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  customClassName,
  content,
  actionButton
}: ITryModalProps) {
  return (
    <>
      <dialog className={`modal`} open={isOpen}>
        <div className={`p-16 modal-box rounded-none shadow-none bg-modal ${customClassName}`}>
          <h3 className="font-bold text-2xl pb-8">{title}</h3>
          {content}
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