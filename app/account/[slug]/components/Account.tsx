"use client"

import { signOut } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/lib/db-utils"
import styles from "./Account.module.css"
import { SyntheticEvent } from "react"

export default function Account({userId} : {userId: string}) {
    const { data, status } = useQuery(["user"], () => {
        return getUser(userId)
      });

    if (status === "loading") {
        return (
            <div>
                Hold on...
            </div>
        )
    }

    const handleLogout = (e: SyntheticEvent) => {
        signOut({
            callbackUrl: "/"
        });
    }

    
    if (data && data.user) { 
    return (
        <section className={styles.container}>
            <div className={styles.container}>
                Hey there, {data.user.name}
            </div>
            <div>
            <div className={styles.logoutButton} onClick={handleLogout}>
                Logout
            </div>
            </div>
        </section>
    )
    }
    
    return null;
    
}