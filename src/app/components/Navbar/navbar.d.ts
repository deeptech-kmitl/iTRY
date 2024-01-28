export interface NotificationProps {
  countNotification: number;
  notifications: NotificationRow[];
}

export interface NotificationRow {
  title: string;
  description: string;
  date: string;
}
