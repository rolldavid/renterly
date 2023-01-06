import { Review } from "@prisma/client"
import { RevList, MappedRevList, StarProps } from "app/account/types"
import UserReviewItem from "./UserReviewItem"
import styles from './UserReviews.module.css'


export default function ({reviews, stars} : {reviews: Review[], stars: StarProps[] }) {
        
        return (
            <div className={styles.container}>
                <p className={styles.reviewsTitle}>Your reviews</p>
                { reviews.map((review, index) => {
                    const revStar = stars.filter(function(item){
                        return item.reviewId === review.id
                    })
                    
                    return (
                        <UserReviewItem review={review} stars={revStar[0].stars} key={index}/>
                    )
                }) }
            </div>
    )
}