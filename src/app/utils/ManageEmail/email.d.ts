export interface SendEmail {
    activityName: string,
    activityDetail: string,
    followerId: string
}

export interface Notification {
    activityId: string,
    activityName: string,
    activityDetail: string,
    sendDate: string,
    redirectLink?: string
}

export interface NotificationProp {
    countNotification: number;
    notifications: Notification[];
}