'use client'
import ITryDropDown from "../DropDown";
import { NotificationProps } from "./navbar.d";

export default function ITryNotification({ countNotification, notifications }: NotificationProps) {

  const getCustomDataDropDown = () => {
    return (
      <>
        {notifications?.map((notification, index) => (
          <li key={index}>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal "
              href="#"
            >
              <div className="flex flex-col">
                <div className="flex items-end gap-4">
                  <p className="font-bold">{notification.title}</p>
                  <p className="text-stone-400 text-xs">{notification.date}</p>
                </div>
                <div className="text-stone-300 text-xs">
                  {notification.description}
                </div>
              </div>
            </a>
          </li>
        ))}
      </>
    )
  }

  return (
    <>
      <ITryDropDown customData={getCustomDataDropDown()} position="bottom-left" removeBg>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item text-white">{countNotification}</span>
            </div>
          </button>
        </div>
      </ITryDropDown>
    </>
  )
}