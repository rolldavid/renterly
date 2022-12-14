"use client"

import { useQuery } from "@tanstack/react-query"
import { Review } from "@prisma/client"

import { getProperty } from "@/lib/db-utils"
import ReviewInput from "./ReviewInput"
import { Property } from "@prisma/client"
import ReviewItem from "./ReviewItem"
import Spinner from "@/lib/utils/Spinner"
import styles from "./Reviews.module.css"
import Link from "next/link"

interface UserList {
    displayName: string;
    citystate: string;
    image: string;
}

export default function Reviews({ property }: { property: Property }) {
    const {data, status} = useQuery(["reviews"], () => {
        return getProperty(property.id)
    })

    if (status === "loading") {
        return (
            <Spinner />
        )
    }

    if (status === "success" && data) {
        const revList: Review[] = data.reviews;
        const userList: UserList[] = data.users;

        if (revList.length > 0) {
            return (
                <section className={styles.container}>
                    <Link 
                        className={styles.reviewButton}
                        href={`/review/${property.slug}`}
                    >
                        Add a Review
                    </Link>
        
                    <div className={styles.revItemContainer}>
                        { revList.map((review, index) => {
                            return <ReviewItem review={review} key={index} user={userList[index]}/>
                        })}
                    </div>
                </section>
            )
        } else {
        return (
                <ReviewInput property={property}/> 
        
        )}
}
    return null
}