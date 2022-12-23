"use client"

import { useState, useRef, useEffect, SyntheticEvent } from "react";
import Image from "next/image"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, updateNotifications } from "@/lib/db-utils"
import styles from "./NotificationIcon.module.css"
import Notifications from "./Notifications";

export default function NotificationIcon() {
    const [showNotifications, setShowNotifications] = useState(false)

    const ref = useRef<HTMLInputElement>(null)
   
    const queryClient = useQueryClient();

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


    const handleNotifications = (e: SyntheticEvent) => {
        e.preventDefault()
        setShowNotifications(true)
        updateNotifications()
    }

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
            {data.activeNotifications.length > 0 && <Image 
                src={`/images/icons/bell-notify.png`}
                width={22}
                height={22}
                alt="notifications"
                onClick={handleNotifications}
                className={styles.bellImg}
             />}
            {data.activeNotifications.length === 0 && <Image 
                src={`/images/icons/bell.png`}
                width={22}
                height={22}
                alt="notifications"
                onClick={handleNotifications}
                className={styles.bellImg}
             />}

                {status === "success" && showNotifications && data.activeNotifications && data.completeNotifications &&
                    <div className={styles.notificationsModuleContainer} ref={ref}>
                        <div className={styles.notificationsModule}>
                       
                            <div className={styles.notificationOuterContainer}>
                                {data.activeNotifications.length > 0 && <div className={styles.notificationNewContainer}>
                                    <p className={styles.newTitle}>New</p>
                                    {
                                        data.activeNotifications.map((notification: {notification: string, createdAt: Date}, index: number) => {
                                            return (
                                                <div key={index}>
                                                    <p className={styles.newNotification}>{notification.notification}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>}
                                {data.completeNotifications.length > 0 && <div className={styles.notificationCompleteContainer}>
                                    <p className={styles.recentTitle}>Recent</p>
                                    {
                                        data.completeNotifications.map((notification: {notification: string, createdAt: Date}, index: number) => {
                                            return (
                                                <div key={index}>
                                                    <p className={styles.recentNotification}>{notification.notification}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>}
                                {data.activeNotifications.length === 0 && data.completeNotifications.length === 0 && 
                                <div className={styles.notificationContainer}>
                                    <p className={styles.recentNotification}>No notifications</p>
                                </div>}
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