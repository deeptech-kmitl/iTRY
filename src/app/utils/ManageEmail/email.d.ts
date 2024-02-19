export interface SendEmail {
    activityName: string,
    activityDetail: string,
    followerId: string
}

export interface Notification {
    activityName: string,
    activityDetail: string,
    sendDate: string
}

export interface NotificationProp {
    countNotification: number;
    notifications: Notification[];
}