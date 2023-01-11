import { Review, Star } from "@prisma/client"
import { RevList, MappedRevList, StarProps } from "app/account/types"
import UserReviewItem from "./UserReviewItem"
import { placeholderReviews, placeholderStars } from "./Placeholder"
import styles from './UserReviews.module.css'


export default function ({reviews, stars} : {reviews: Review[], stars: Star[] }) {
        
        if (reviews.length > 0) {
            return (
                <div className={styles.container}>
                    <p className={styles.reviewsTitle}>Your reviews</p>
                    { reviews.map((review, index) => {
                        const matchingReview = stars.filter(function(star){
                            return star.reviewId === review.id 
                        })
                        const reviewStars = matchingReview[0].stars
                        return (
                            <UserReviewItem review={review} stars={reviewStars} key={index} placeholder={false}/>
                        )
                    }) }
                </div>
            )
        }

        return (
            <div className={styles.container}>
                <p className={styles.placeholderTitle}>You&apos;ll see all your reviews below</p>
                { placeholderReviews.map((review, index) => {
                    const matchingReview = placeholderStars.filter(function(star){
                        return star.reviewId === review.id 
                    })
                    const reviewStars = matchingReview[0].stars
                    
                    return (
                        <UserReviewItem review={review} stars={reviewStars} key={index} placeholder={true}/>
                    )
                }) }
            </div>
    )
}