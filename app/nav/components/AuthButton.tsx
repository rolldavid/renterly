"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query";
import { signIn } from "next-auth/react"
import AuthContainer from "../../auth/components/AuthContainer"
import { getUserSession } from "@/lib/db-utils"
import styles from "./AuthButton.module.css"

export default function AuthButton() {
    const [showAuth, setShowAuth] = useState(false)

    const ref = useRef<HTMLInputElement>(null)

    const {data, status} = useQuery(["session"], () => {
        return getUserSession()
    })

    useEffect(() => {
        if (status === "success" && data.userId) {
            setShowAuth(false)
        }
    }, [data])

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
            <div className={styles.dotWrap}>
                <div className={styles.dotFlashing}></div>
            </div>
        )
    }

    if (status === "success" && data.session) {
        return (
            <Link href={`/account/${data.userId}`} className={styles.profileIcon}>
                <Image src={`/images/nav/profile.png`} width={22} height={22} alt="profile"/>
            </Link>
        ) 
    } else {
        return (
            <>
                <div className={styles.loginButton} onClick={() => setShowAuth(true)}>
                <Image src={`/images/nav/profile.png`} width={22} height={22} alt="profile"/>
                </div>

                {showAuth &&
                    <div className={styles.authModuleContainer} ref={ref}>
                        <div className={styles.authModule}>
                            <AuthContainer fromReview={false}/>
                        </div>
                    </div>
                }
            </>
        )
    }
}