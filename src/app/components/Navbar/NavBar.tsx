'use client'
import ITryNotification from './Notification';
import ITryUserName from './UserName';
// import { NotificationProps } from './navbar.d';
import { NotificationProp, Notification } from '@/app/utils/ManageEmail/email';
import HomeIcon from './HomeIcon';
import TabNavBar from './TabNavBar';
import useUserController from './useUserController';

export default function ITryNavBar() {

  const { userData } = useUserController();

  const notificationData: NotificationProp = {
    countNotification: userData?.notifications.length || 0,
    notifications: [...userData?.notifications]
  }


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