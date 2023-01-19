"use client"

import Link from "next/link";
import Image from "next/image";
import { AuthProps } from "../types";
import AuthButton from "./AuthButton";
import NotificationIcon from "app/notifications/components/NotificationIcon";
import following from "../assets/house.png"
import search from "../assets/search.png"
import styles from "./NavLinks.module.css"


export default function NavLinks({status, userId, session}: AuthProps) {
   
    return (
        <nav className={styles.container}>
            <div className={styles.logoContainer}>
                <Link href={"/"}>
                    <h1 className={styles.logo}>renterly</h1>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link href={"/"} className={styles.navItem}>
                    <Image 
                        src={search}
                        width={23}
                        height={26}
                        alt="notifications"
                        className={styles.linkIcon}
                    />
                    <h2 className={styles.navText}>Search</h2>
                </Link>
                <Link href={"/bookmarks"} className={styles.navItem}>
                    <Image 
                        src={following}
                        width={23}
                        height={26}
                        alt="notifications"
                        className={styles.linkIcon}
                    />
                    <h2 className={styles.navText}>Following</h2>
                </Link>
                <div className={styles.notificationDesktop}>
                    <NotificationIcon />
                </div>
                <Link href="/notifications" className={styles.notificationMobile}>
                    <NotificationIcon />
                    <h2 className={styles.navText}>Notifications</h2>
                </Link>
                <div className={styles.authDesktop}>
                    <AuthButton status={status} userId={userId} session={session} />
                </div>
                <Link href={session && userId ? `/account/${userId}` : "/auth"} className={styles.authMobile}>
                    <AuthButton status={status} userId={userId} session={session} />
                </Link>
            </div>
        </nav>
    )
}