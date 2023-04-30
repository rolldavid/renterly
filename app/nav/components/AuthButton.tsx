"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { AuthProps } from "../types"
import AuthContainer from "../../auth/components/AuthContainer"
import profile from "../assets/profile.png"
import styles from "./AuthButton.module.css"

export default function AuthButton({status, userId, session}: AuthProps) {
    const [showAuth, setShowAuth] = useState(false)

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (status === "success" && userId) {
            setShowAuth(false)
        }
    }, [session])




    if (status === "loading") {
        return (
            <div className={styles.authIconContainer}>
                <Image src={profile} width={23} height={26} alt="profile"/>
                <h2 className={styles.navText}>Profile</h2>
            </div>
        )
    }

    if (status === "success" && session && userId) {
        return (
            <Link href={`/account/${userId}`} className={styles.authIconContainer}>
                <Image src={profile} width={23} height={26} alt="profile" className={styles.authIcon}/>
                <h2 className={styles.navText}>Profile</h2>
            </Link>
        ) 
    } else {
        return (
            <>
                <div className={styles.authIconContainer} onClick={() => setShowAuth(true)}>
                    <Image src={profile} width={23} height={26} alt="profile" className={styles.authIcon}/>
                    <h2 className={styles.navText}>Profile</h2>
                </div>

                {showAuth &&
                    <div className={styles.authModuleContainer} ref={ref}>
                        <div className={styles.authModule}>
                            <div className={styles.authWrapper}>
                                <div className={styles.xWrapper}>
                                    <p  
                                        className={styles.x}
                                        onClick={() => setShowAuth(false)}
                                    >X</p>
                                </div>
                                
                                <AuthContainer/>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}