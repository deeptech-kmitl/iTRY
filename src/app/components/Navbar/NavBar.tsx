'use client'
import ITryNotification from './Notification';
import ITryUserName from './UserName';
// import { NotificationProps } from './navbar.d';
import { NotificationProp, Notification } from '@/app/utils/ManageEmail/email';
import HomeIcon from './HomeIcon';
import TabNavBar from './TabNavBar';
import useUserController from './useUserController';

export default function ITryNavBar() {

  return (
    <div className="navbar">
      <div className="navbar-start md:justify-start justify-center">
        <HomeIcon />
      </div>
      <div className="navbar-center">
        <TabNavBar />
      </div>
      <div className="navbar-end md:gap-4 md:px-10 px-0">
        <ITryUserName />
        <ITryNotification />
      </div>
    </div>
  );
}