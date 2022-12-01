"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import styles from "@/styles/Home.module.css"

export default function AuthButton({ isSignedIn } : {isSignedIn: boolean}) {
    const [userId, setUserId] = useState<string>()

    useEffect(() => {
        const getSession = async () => {
            const res = await fetch("/api/get-user-id")
            const data = await res.json();
            setUserId(data.id)
        }
        getSession()
    }, [])

    if (isSignedIn) {
        return (
            <Link href={`/account/${userId}`} className={styles.buttonBasic}>
                PROFILE
            </Link>
        ) 
    } else {
        return (
            <div className={styles.buttonBasic} onClick={() => signIn()}>
                LOGIN
            </div>
        )
    }
}