"use client"
import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
import { getUserSession } from "@/lib/db-utils"
import styles from "./AuthButton.module.css"

export default function AuthButton() {
    const {data, status} = useQuery(["session"], () => {
        return getUserSession()
    })

    if (status === "loading") {
        return (
            <div className={styles.dotWrap}>
                <div className={styles.dotFlashing}></div>
            </div>
        )
    }

    if (status === "success" && data.session) {
        return (
            <Link href={`/account/${data.userId}`} className={styles.buttonBasic}>
                <Image src={`/images/profile/${data.image}.png`} width={30} height={30} alt="profile"/>
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