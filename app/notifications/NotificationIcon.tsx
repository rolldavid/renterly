"use client"

import { useState, useRef, useEffect, SyntheticEvent } from "react";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, updateNotifications } from "@/lib/db-utils"
import { NotificationProps } from "./types";
import Notification from "./Notification";
import styles from "./NotificationIcon.module.css"

export default function NotificationIcon() {
    const [showNotifications, setShowNotifications] = useState(false)

    const router = useRouter();

    const ref = useRef<HTMLInputElement>(null)
   
    const queryClient = useQueryClient();

    const {data, status} = useQuery(["notification"], () => {
        return getNotifications()
    })


    const handleModalClose = async (e: MouseEvent) => {
        e.preventDefault()
        if (e.target instanceof Element) {
            if (ref.current?.classList[0] === e.target.classList[0]) {
                queryClient.invalidateQueries(['notification'])
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
                width={23}
                height={26}
                alt="notifications"
             />
        )
    }

    const routeNotification = async (e: SyntheticEvent, slug: string | boolean) => {
        e.preventDefault()
        if (slug) {
            setShowNotifications(false)
            queryClient.invalidateQueries(['notification'])
            router.push(`/property/${slug}`)
        }

    }


    if (status === "success" && data.activeNotifications && data.loggedIn) {
        return (
            <>
            {data.activeNotifications.length > 0 && <Image 
                src={`/images/icons/bell-notify.png`}
                width={23}
                height={26}
                alt="notifications"
                onClick={handleNotifications}
                className={styles.bellImg}
             />}
            {data.activeNotifications.length === 0 && <Image 
                src={`/images/icons/bell.png`}
                width={23}
                height={26}
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
                                        data.activeNotifications.map((notification: NotificationProps, index: number) => {
                                            return (
                                                <div key={index} onClick={(e) => routeNotification(e, notification.slug)} className={styles.notificationInner}>
                                                    <Notification notification={notification} status={"new"}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>}
                                {data.completeNotifications.length > 0 && <div className={styles.notificationCompleteContainer}>
                                    <p className={styles.recentTitle}>Recent</p>
                                    {
                                        data.completeNotifications.map((notification: NotificationProps, index: number) => {
                                            return (
                                                <div key={index} onClick={(e) => routeNotification(e, notification.slug)} className={styles.notificationInner}>
                                                    <Notification notification={notification} status={"complete"}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>}
                                {data.activeNotifications.length === 0 && data.completeNotifications.length === 0 && 
                                <div className={styles.notificationContainer}>
                                    <div className={styles.welcomeNotification}>
                                        <h4 className={styles.welcomeTitle}>Welcome!</h4>
                                        <p className={styles.welcomeText}> You&apos;ll get notified here about changes to properties you&apos;ve reviewed.</p>
                                    </div>
                                    <div className={styles.welcomeImgContainer}>
                                        <Image 
                                        className={styles.welcomeImg} 
                                        src="/images/icons/celebrate.png" 
                                        width={50}
                                        height={50}
                                        alt="celebrate icon"/>
                                </div></div>}
                            </div>
                      
                        </div>
                    </div>
                }
            </>
        ) 
    }

    if (status === "success" && data.loggedIn) {
        return (
            <>
                <Image 
                    src={"/images/icons/bell.png"}
                    width={23}
                    height={26}
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
        <>
     
        <Image 
            src={`/images/icons/bell.png`}
            width={23}
            height={26}
            alt="notifications"
            onClick={() => setShowNotifications(true)}
            className={styles.bellImg}
         />
         {showNotifications &&
                <div className={styles.notificationsModuleContainer} ref={ref}>
                    <div className={styles.notificationsModule}>
                        <div className={styles.searchContainer}>
                                <p className={styles.searchText}>Add a review or follow a property to get notifications.</p>
                            </div>
                            </div>
                </div>
            }
         </>
    )
}