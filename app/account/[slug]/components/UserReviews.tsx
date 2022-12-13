import { Review } from '@prisma/client'
import UserReviewItem from "./UserReviewItem"
import styles from './UserReviews.module.css'
export default function ({reviews} : { reviews: Review[] }) {
 
        return (
            <div className={styles.container}>
                { reviews.map((review, index) => {
                    return (
                        <UserReviewItem review={review} key={index}/>
                    )
                }) }
            </div>
    )
}