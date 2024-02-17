'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ITryNotification from './Notification';
import ITryUserName from './UserName';
// import { NotificationProps } from './navbar.d';
import { NotificationProp, Notification } from '@/app/utils/ManageEmail/email';
import HomeIcon from './HomeIcon';
import TabNavBar from './TabNavBar';
import { usePathname } from 'next/navigation';
import { getNotification } from '@/app/api/notification/[userId]/route';

export default function ITryNavBar({ fetchNotification }: { fetchNotification: any }) {

  const [notificationData, setNotificationData] = useState<NotificationProp>({
    countNotification: 0,
    notifications: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fetchNotification) {
          const data = await fetchNotification()
          setNotificationData({
            countNotification: (data.data.Items)?.length ?? 0,
            notifications: data.data.Items ?? []
          });
        }
      } catch (error) {
        console.error('Failed to fetch notification data:', error)
      }
    };

    fetchData()
    console.log('----------END---------------')
  }, [fetchNotification])


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
        <ITryNotification notificationData={notificationData} />
      </div>
    </div>
  );
}