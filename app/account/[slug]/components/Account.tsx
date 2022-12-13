"use client"

import { SyntheticEvent } from "react"
import { signOut } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/lib/db-utils"
import AccountImage from "./AccountImage"
import styles from "./Account.module.css"
import AuthContainer from "../../../auth/components/AuthContainer"
import AccountDetails from "./AccountDetails"
import UserReviews from "./UserReviews"

export default function Account({userId} : {userId: string}) {
    const { data, status } = useQuery(["user"], () => {
        return getProfile(userId)
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

    if (!data.session) {
        return <AuthContainer />
    }
    
    if (data.user && data.session) { 
    return (
        <section className={styles.container}>
            <div className={styles.container}>
                <AccountImage user={data.user} session={data.session} />
                <AccountDetails user={data.user} session={data.session}/>
                <UserReviews reviews={data.reviews}/>
            </div>
            <div>
            <div className={styles.logoutButton} onClick={handleLogout}>
                Logout
            </div>
            </div>
        </section>
    )
    }
    
    return null
    
}