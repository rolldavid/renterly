"use client"
import Link from "next/link";
import Image from "next/image";
import styles from "./NavLinks.module.css"

import AuthButton from "./AuthButton";

export default function NavLinks() {
   
    return (
        <nav className={styles.container}>
            <nav className={styles.linkContainer}>
                <Link href={"/"}>
                    <h1 className={styles.logo}>renterly</h1>
                </Link>
            </nav>
            <div className={styles.accountContainer}>
                
                <div className={styles.authContainer}>
                    <Link href={"/timeline"}>
                        <Image 
                            src={"/images/icons/blackStar.png"}
                            width={22}
                            height={22}
                            alt="reviews"
                            className={styles.navItem}
                        />
                    </Link>
                    <Link href={"/"}>
                        <Image 
                            src={"/images/icons/bell-notify.png"}
                            width={22}
                            height={22}
                            alt="notifications"
                            className={styles.navItem}
                        />
                    </Link>
                    <div className={styles.navItem}>
                        <AuthButton />
                    </div>
                    
                </div>
            </div>
        </nav>
    )
}