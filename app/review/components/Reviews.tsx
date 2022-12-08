"use client"

import { useQuery } from "@tanstack/react-query"
import { Review } from "@prisma/client"

import { getProperty } from "@/lib/db-utils"
import ReviewList from "./ReviewList"
import ReviewInput from "./ReviewInput"
import { Property } from "@prisma/client"
import Spinner from "@/lib/utils/Spinner"
import styles from "./Reviews.module.css"
import Link from "next/link"

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
        const revList: Review[] = data.reviews
        if (revList.length > 0) {
            return (
                <section className={styles.container}>
                    <Link 
                        className={styles.reviewButton}
                        href={{
                            pathname: "/review",
                            query: {
                                slug: `${property.slug}`
                            }
                        }}
                    >
                        Add a Review
                    </Link>
        
                    <ReviewList reviewList={revList}/>
                </section>
            )
        } else {
        return (
                <ReviewInput property={property}/> 
        
        )}
}
    return null
}