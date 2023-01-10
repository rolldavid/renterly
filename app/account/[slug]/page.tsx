"use client"

import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/lib/db-utils"
import AccountDetails from "./components/AccountDetails"
import UserReviews from "./components/UserReviews"
import Spinner from "@/lib/utils/Spinner"
import styles from "@/styles/Account.module.css"

export default function Page({params: {slug}}: {params: { slug: string }}) {
   const userId = parseInt(slug)

   const { data, status } = useQuery(["user"], () => {
      return getProfile(userId)
    });

  if (status === "loading") {
      return <Spinner />
  }

  if (status === "success" && data.user) { 

      return (
            <div className={styles.container}>
               <section className={styles.accountContainer}>
                  <div className={styles.accountInner}>
                  <AccountDetails user={data.user} accountOwner={data.accountOwner}/>
                  </div>
               </section>
               <section className={styles.reviewContainer}>
                  <UserReviews reviews={data.reviews} stars={data.stars}/>
               </section>
            </div>
         )
  }

  return null;
}

