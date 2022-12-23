export interface NavProps {
    nav: string
}

export interface NotificationProps {
    notification: string;
    street: string | boolean;
    slug: string | boolean;
    createdAt: Date;
    notificationId: number;
}