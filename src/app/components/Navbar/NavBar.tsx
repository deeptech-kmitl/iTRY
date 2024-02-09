'use client'
import Link from 'next/link';
import { useState } from 'react';
import ITryNotification from './Notification';
import ITryUserName from './UserName';
import { NotificationProps } from './navbar.d';
import HomeIcon from './HomeIcon';
import TabNavBar from './TabNavBar';
import { usePathname } from 'next/navigation';

export default function ITryNavBar() {
  const [notificationData, setNotificationData] = useState<NotificationProps>({
    countNotification: 0,
    notifications: [
      {
        title: "wave",
        description: "description",
        date: "22-09-2522"
      }
    ]
  })


  return (
    <div className="navbar">
      <div className="navbar-start">
        <HomeIcon />
      </div>
      <div className="navbar-center">
        <TabNavBar />
      </div>
      <div className="navbar-end md:gap-4 md:px-10 px-0">
        <ITryUserName />
        <ITryNotification {...notificationData} />
      </div>
    </div>
  );
}