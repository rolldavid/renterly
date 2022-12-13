import { Review } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import styles from "./UserReviewItem.module.css"

export default function UserReviewItem({ review } : { review: Review }) {
    let starTracker = 0;
    return (
        <div className={styles.container}>
            <div className={styles.reviewTitleContainer}>
                <Link href={`/property/${review.propertySlug}`}><h3 className={styles.reviewTitle}>{review.street}</h3>
                </Link>
                <p className={styles.reviewLocation}>{review.citystate}</p>
            </div>
            <div className={styles.starContainer}>
                        <div className={styles.starDetails}>
                            {[...Array(5)].map((star, index) => {      
                                    if (starTracker < review.stars) {
                                        starTracker += 1
                                        return (         
                                            <Image 
                                                    src={"/fullStar.png"} 
                                                    width={20} 
                                                    height={20} 
                                                    alt="rating star" 
                                                    className={styles.starItem}
                                                    key={index}
                                                />
                                        );
                                    } else {
                                        return (         
                                            <Image 
                                                    src={"/emptyStar.png"} 
                                                    width={20} 
                                                    height={20} 
                                                    alt="rating star" 
                                                    className={styles.starItem}
                                                    key={index}
                                                />
                                        );
                                    }
                                })}
                            
                        </div>
                        <div className={styles.dateContainer}>
                            <p className={styles.dateDetails}>11/9/2022</p>
                        </div>
                </div>
                <div className={styles.reviewContainer}>
                    {review.comment}
                </div>
        </div>
    )
}