"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image"
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/lib/db-utils"
import styles from "./NotificationIcon.module.css"
import Notifications from "./Notifications";

export default function NotificationIcon() {

    const [showNotifications, setShowNotifications] = useState(false)


    const ref = useRef<HTMLInputElement>(null)
   
    const {data, status} = useQuery(["notification"], () => {
        return getNotifications()
    })



    const handleModalClose = (e: MouseEvent) => {
        e.preventDefault()
        if (e.target instanceof Element) {
            if (ref.current?.classList[0] === e.target.classList[0]) {
                setShowNotifications(false)
            }
        }
    }

    useEffect(() => {
        const element = ref.current
        if (showNotifications && element) {
            element.addEventListener("click", e => handleModalClose(e))
        }
     
        return () => {
            if (element) {
            element.removeEventListener("click", e => handleModalClose(e))
            }
        }
    }, [showNotifications])


    if (status === "loading") {
        return (
            <Image 
                src={`/images/icons/bell.png`}
                width={22}
                height={22}
                alt="notifications"
             />
        )
    }

    if (status === "success" && data && data.activeNotifications) {
        return (
            <>
            <Image 
                src={`/images/icons/bell-notify.png`}
                width={22}
                height={22}
                alt="notifications"
                onClick={() => setShowNotifications(true)}
                className={styles.bellImg}
             />
             {status === "success" && showNotifications &&
                    <div className={styles.notificationsModuleContainer} ref={ref}>
                        <div className={styles.notificationsModule}>
                        <div className={styles.notificationContainer}>
                            {
                                data.activeNotifications.map((notification: {notification: string, createdAt: Date}, index: number) => {
                                    return (
                                        <div key={index}>
                                            <p>{notification.notification}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        </div>
                    </div>
                }
            </>
        ) 
    }

    if (status === "success" && data) {
        return (
            <>
                <Image 
                    src={"/images/icons/bell.png"}
                    width={22}
                    height={22}
                    alt="notifications"
                    onClick={() => setShowNotifications(true)}
                    className={styles.bellImg}
                />
                {showNotifications &&
                    <div className={styles.notificationsModuleContainer} ref={ref}>
                        <div className={styles.notificationsModule}>
                            No new notifications
                        </div>
                    </div>
                }
            </>
        )
    }

    return (
        <Image 
                src={"/images/icons/bell.png"}
                width={22}
                height={22}
                alt="notifications"
                className={styles.bellImg}
             />
    )
}