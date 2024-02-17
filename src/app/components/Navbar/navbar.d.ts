export interface NotificationProps {
  countNotification: number;
  notifications: NotificationRow[];
}

export interface NotificationRow {
  activityName: string,
  activityDetail: string,
  followerId: string,
}
