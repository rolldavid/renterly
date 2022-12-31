"use client"

import { useQuery } from "@tanstack/react-query"
import { Review, Star, Property } from "@prisma/client"

import { getProperty } from "@/lib/db-utils"
import ReviewInput from "./ReviewInput"
import { PropertyProps, StarProps } from "./types"
import ReviewItem from "./ReviewItem"
import Spinner from "@/lib/utils/Spinner"
import styles from "./Reviews.module.css"
import Link from "next/link"

export default function Reviews({ property }: { property: PropertyProps }) {
    
    const {data, status} = useQuery(["reviews"], () => {
        const res = getProperty(property.id) 
        return res
    },
    {cacheTime: 0})

    if (status === "loading") {
        return (
            <Spinner />
        )
    }

    if (status === "success" && data) {
    
        if (data.reviews && data.reviews.length > 0) {
            return (
                <section className={styles.container}>
                    <Link 
                        className={styles.reviewButton}
                        href={`/review/${property.slug}`}
                    >
                        {data.postedReview ? "Edit Review" : "Add a Review"}
                    </Link>
        
                    <div className={styles.revItemContainer}>
                        { data.reviews.map((review: Review, index: number) => {
                            return <ReviewItem review={review} key={index} user={data.users[index]}/>
                        })}
                    </div>
                </section>
            )
        } 

    return (
            <ReviewInput 
                property={property} 
                editingReview={false}
                comment={""} 
                stars={0} 
                reviewId={null}
                starId={""}
            /> 
    )
    
    }

    return null
}