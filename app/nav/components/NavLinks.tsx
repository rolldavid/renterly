"use client"
import Link from "next/link";
import Image from "next/image";
import { AuthProps } from "../types";
import styles from "./NavLinks.module.css"

import AuthButton from "./AuthButton";
import NotificationIcon from "app/notifications/NotificationIcon";

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
                        src={"/images/icons/search.png"}
                        width={23}
                        height={26}
                        alt="notifications"
                    />
                </Link>
                <Link href={"/"} className={styles.navItem}>
                    <Image 
                        src={"/images/icons/house.png"}
                        width={23}
                        height={26}
                        alt="notifications"
                    />
                </Link>
                
                <div className={styles.navItem}>
                    <NotificationIcon />
                </div>
                <div className={styles.navItem}>
                    <AuthButton status={status} userId={userId} session={session}/>
                </div>
            </div>
        </nav>
    )
}