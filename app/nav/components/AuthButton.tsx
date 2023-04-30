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

    const handleModalClose = (e: MouseEvent) => {
        e.preventDefault()
        if (e.target instanceof Element) {
            if (ref.current?.classList[0] === e.target.classList[0]) {
                setShowAuth(false)
            }
        }
    }

    useEffect(() => {
        const element = ref.current
        if (showAuth && element) {
            element.addEventListener("click", e => handleModalClose(e))
        }
     
        return () => {
            if (element) {
            element.removeEventListener("click", e => handleModalClose(e))
            }
        }
    }, [showAuth])


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
                            <AuthContainer />
                        </div>
                    </div>
                }
            </>
        )
    }
}