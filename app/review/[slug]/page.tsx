"use client"

import { useQuery } from "@tanstack/react-query";
import { getReviewPage } from '@/lib/db-utils';
import ReviewInput from "../components/ReviewInput";
import styles from "@/styles/Review.module.css"
import Spinner from "@/lib/utils/Spinner";

export default function Page({params: {slug}}: {params: { slug: string }}) {

        const {data, status} = useQuery(["reviewPage"], () => {
            return getReviewPage(slug)
        })
              
        if (status === "loading") {
            return <Spinner />
        }

        if (status === "success" && data.property && data.property.stars && data.property.stars.length > 0 && data.property.reviews.length > 0) {
                
                    const starNum = data.property.stars[0].stars
                    const commentStr = data.property.reviews[0].comment
                    const starId = data.property.stars[0].id
                    const reviewId = data.property.reviews[0].id

                    return (
                        <div className={styles.container}>
                            <ReviewInput 
                                property={data.property} 
                                editingReview={true} 
                                comment={commentStr} 
                                stars={starNum}
                                reviewId={reviewId}
                                starId={starId}
                            />
                        </div>
                    )
        }
        if (status === "success" && data.property) {
                const starNum = 0;
                const commentStr = ""
                return (
                    <div className={styles.container}>
                        <ReviewInput 
                            property={data.property} 
                            editingReview={false} 
                            comment={commentStr} 
                            stars={starNum}
                            reviewId={null}
                            starId={""}
                        />
                    </div>
                    )
            } 

}

