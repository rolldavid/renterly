"use client"

import { usePathname } from 'next/navigation'
import Link from "next/link"
import styles from "./AuthContainer.module.css"
import Login from "./Login"

export default function AuthContainer() {
 
    const pathname = usePathname()

    if (typeof pathname === "string") {
    return (
        <div className={styles.outerContainer}>
         <section className={styles.container}>
            
            <div className={styles.authHeader}>
                <h2 className={styles.authHeaderTitle}>
                    {`Welcome!`}
                </h2>
                <p className={styles.authHeaderSubtitle}>
                    {`Continue below to post your review on renterly`}
                </p>
            </div>
            <div className={styles.authContainer}>
                <Link className={styles.loginButton} href={`/api/auth/login?returnTo=${encodeURIComponent(pathname)}`} target="_top" prefetch={false}>
                    Login
                </Link>     
            </div>
        </section>
        </div>
    )
    }

     return (
        <Link className={styles.loginButton} href="/api/auth/login" target="_top" prefetch={false}>
            Login
        </Link>         
    )
}