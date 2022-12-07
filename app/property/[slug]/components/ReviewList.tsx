
import { Review } from "@prisma/client"
import ReviewItem from "./ReviewItem"
import styles from "./ReviewList.module.css"

export default function ReviewList({ reviewList }: { reviewList: Review[] }) {
    return(
        <div className={styles.container}>
            { reviewList.map((review, index) => {
                return <ReviewItem review={review}/>
            }) }
        </div>
    )
}