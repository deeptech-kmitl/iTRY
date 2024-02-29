'use client'
import Link from "next/link";
import ITryDropDown from "../DropDown";
// import { NotificationProps } from "./navbar.d";
import { NotificationProp, Notification } from '@/app/utils/ManageEmail/email';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function ITryNotification({ notificationData }: { notificationData: NotificationProp }) {  

  const notifications = notificationData.notifications

  if (Array.isArray(notifications)) {
      const getCustomDataDropDown = () => {
      return (
        <>
          {notifications.length != 0 ? notifications?.map((notification, index) => (
            <li key={index}>
              <Link
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal "
                href="#"
                shallow
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-start gap-4">
                    <p className="font-bold">{notification.activityName}</p>
                    <p className="text-stone-400 text-xs self-end">{notification.sendDate}</p>
                  </div>
                  <div className="text-stone-300 text-xs">
                    {notification.activityDetail}
                  </div>
                </div>
              </Link>
            </li>
          )) : (
              <div
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal "
              >
                <div className="flex flex-col">
                  <div className="flex items-end gap-4">
                    <p>ไม่มีการแจ้งเตือน</p>
                  </div>
                </div>
              </div>
          )}
        </>
      )
    }

    return (
      <>
        <ITryDropDown customClassNameDropDownContent="overflow-x-hidden	flex-nowrap	max-h-80" customData={getCustomDataDropDown()} position="bottom-left" removeBg>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FontAwesomeIcon className="h-4 md:h-6" icon={faBell} />
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