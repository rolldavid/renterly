"use client"

import { SyntheticEvent } from "react"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/lib/db-utils"
import styles from "./Account.module.css"
import AuthContainer from "../../../auth/components/AuthContainer"
import AccountDetails from "./AccountDetails"
import UserReviews from "./UserReviews"
import Spinner from "@/lib/utils/Spinner"
import { Review, Star } from "@prisma/client"
import { RevList } from "app/account/types"

export default function Account({userId} : {userId: number}) {
    const { data, status } = useQuery(["user"], () => {
        return getProfile(userId)
      });

    if (status === "loading") {
        return <Spinner />
    }

    
    
    if (status === "success" && data) { 

        return (
            <section className={styles.container}>
                <div className={styles.container}>
                    <AccountDetails user={data.user} accountOwner={data.accountOwner}/>
                    <UserReviews reviews={data.reviews} stars={data.stars}/>
                </div>

            </section>
        )
        }
    
    return null
    
}