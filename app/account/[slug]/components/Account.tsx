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

export default function Account({userId} : {userId: string}) {
    const { data, status } = useQuery(["user"], () => {
        return getProfile(userId)
      });

    if (status === "loading") {
        return <Spinner />
    }

    if (!data.session) {
        return (
            <div>
                An account
            </div>
        )
    }

    
    if (status === "success" && data.session) { 

        return (
            <section className={styles.container}>
                <div className={styles.container}>
                    <AccountDetails user={data.user} session={data.session}/>
                    <UserReviews reviews={data.reviews} stars={data.stars}/>
                </div>

            </section>
        )
        }
    
    return null
    
}