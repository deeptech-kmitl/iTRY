'use client'
import Link from "next/link";
import ITryDropDown from "../DropDown";
// import { NotificationProps } from "./navbar.d";
import { NotificationProp, Notification } from '@/app/utils/ManageEmail/email';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function ITryNotification({ notificationData }: { notificationData: NotificationProp }) {  

  if (Array.isArray(notificationData.notifications)) {
      const getCustomDataDropDown = () => {
      return (
        <>
          {notificationData.notifications?.map((notification, index) => (
            <li key={index}>
              <Link
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal "
                href="#"
              >
                <div className="flex flex-col">
                  <div className="flex items-end gap-4">
                    <p className="font-bold">{notification.activityName}</p>
                    <p className="text-stone-400 text-xs">{notification.sendDate}</p>
                  </div>
                  <div className="text-stone-300 text-xs">
                    {notification.activityDetail}
                  </div>
                </div>
              </Link>
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
                <FontAwesomeIcon className="h-6" icon={faBell} />
                <span className="badge badge-xs badge-primary indicator-item text-white right-1/2	">{notificationData.countNotification}</span>
              </div>
            </button>
          </div>
        </ITryDropDown>
      </>
    )
  }

  else {
    return <div>Error</div>
  }
  
}