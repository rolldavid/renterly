"use client"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
import { getUserId } from "@/lib/db-utils"
import styles from "./AuthButton.module.css"



export default function AuthButton() {
    const {data, status} = useQuery(["session"], () => {
        return getUserId()
    })

    if (status === "loading") {
        return (
            <div className={styles.dotWrap}>
                <div className={styles.dotFlashing}></div>
            </div>
        )
    }

    if (status === "success" && data.id) {
        return (
            <Link href={`/account/${data.id}`} className={styles.buttonBasic}>
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