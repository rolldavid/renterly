"use client"

import { useState, useRef, useEffect, SyntheticEvent } from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, updateNotifications } from "@/lib/db-utils"
import { NotificationProps } from "./types"
import Notification from "./components/Notification"
import welcome from "./assets/celebrate.png"
import styles from "@/styles/Notifications.module.css"
import Spinner from "@/lib/utils/Spinner";

export default function NotificationIcon() {
   
    const router = useRouter();
   
    const queryClient = useQueryClient();

    const {data, status} = useQuery(["notification"], () => {
        return getNotifications()
    })


    useEffect(() => {
        updateNotifications()
    }, [])

    if (status === "loading") {
        return (
           <Spinner />
        )
    }

    const routeNotification = async (e: SyntheticEvent, slug: string | boolean) => {
        e.preventDefault()
        if (slug) {
            await queryClient.invalidateQueries(['notification'])
            router.push(`/property/${slug}`)
        }
    }


    if (status === "success" && data.activeNotifications && data.loggedIn) {
        return (
            <>
                {status === "success" && data.activeNotifications && data.completeNotifications &&
                    <div className={styles.container} >
                        <p className={styles.followText}>Notifications</p>
                        <div className={styles.innerContainer}>
                            
                                {data.activeNotifications.length > 0 && <div className={styles.notificationNewContainer}>
                                    <p className={styles.newTitle}>New</p>
                                    {
                                        data.activeNotifications.map((notification: NotificationProps, index: number) => {
                                            return (
                                                <div key={index} onClick={(e) => routeNotification(e, notification.slug)} className={styles.notificationWrap}>
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
                                                <div key={index} onClick={(e) => routeNotification(e, notification.slug)} className={styles.notificationWrap}>
                                                    <Notification notification={notification} status={"complete"}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>}
                                {data.activeNotifications.length === 0 && data.completeNotifications.length === 0 && 
                                <div className={styles.welcomeContainer}>
                                    <p className={styles.followText}>Review or follow a property to get activity notifications.</p>
                                    <Image 
                                    className={styles.welcomeImg} 
                                    src={welcome}
                                    width={50}
                                    height={50}
                                    alt="celebrate icon"/>
                                </div>}
                            </div>
                      
                        </div>
                  
                }
            </>
        ) 
    }

    if (status === "success" && data.loggedIn) {
        return (
        
                
                    <div className={styles.container}>
                        <div className={styles.innerContainer}>
                            No new notifications
                        </div>
                    </div>
           
        )
    }

    return (
        
            
       
       
                <div className={styles.container}>
                    <div className={styles.innerContainer}>
                        <p className={styles.followText}>Add a review or follow a property to get notifications.</p>    
                    </div>
                </div>
        
    )
}