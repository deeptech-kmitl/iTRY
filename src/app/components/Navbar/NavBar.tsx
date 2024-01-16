'use client'
import Link from 'next/link';
import { useState } from 'react';
import ITryNotification from './Notification';
import ITryUserName from './UserName';
import { NotificationProps } from './navbar.d';
import HomeIcon from './HomeIcon';
import TabNavBar from './TabNavBar';

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
      <div className="navbar-end gap-4">
        <ITryUserName />
        <ITryNotification {...notificationData} />
      </div>
    </div>
  );
}