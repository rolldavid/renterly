"use client"
import Link from "next/link"
import Image from "next/image"
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

    if (status === "success" && data.user) {
        return (
            <Link href={`/account/${data.user.id}`} className={styles.buttonBasic}>
                <Image src={`/images/profile/${data.user.image}.png`} width={30} height={30} alt="profile"/>
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