import { MappedRevList, StarProps } from "app/account/types";
import Link from "next/link";
import Image from "next/image";
import styles from "./UserReviewItem.module.css"
import { Review, Star } from "@prisma/client";

export default function UserReviewItem({ review, stars, placeholder } : { review: Review, stars: number, placeholder: boolean }) {

    const readableDate = new Date(review.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

    let starTracker = 0;
    
    if (placeholder) {
        return (
            <div className={styles.placeholderContainer}>
                <div className={styles.reviewTitleContainer}>
                    <div><h3 className={styles.reviewTitle}>{review.street}</h3>
                    </div>
                    <p className={styles.reviewLocation}>{review.citystate}</p>
                </div>
                <div className={styles.starContainer}>
                            <div className={styles.starDetails}>
                                {[...Array(5)].map((star, index) => {      
                                        if (starTracker < stars) {
                                            starTracker += 1
                                            return (         
                                                <Image 
                                                        src={"/images/review/fullStar.png"} 
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
                                                        src={"/images/review/emptyStar.png"} 
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
                                <p className={styles.dateDetails}>{readableDate}</p>
                            </div>
                    </div>
                    <div className={styles.reviewContainer}>
                        {review.comment}
                    </div>
            </div>
        )
    }


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
                                    if (starTracker < stars) {
                                        starTracker += 1
                                        return (         
                                            <Image 
                                                    src={"/images/review/fullStar.png"} 
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
                                                    src={"/images/review/emptyStar.png"} 
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
                            <p className={styles.dateDetails}>{readableDate}</p>
                        </div>
                </div>
                <div className={styles.reviewContainer}>
                    {review.comment}
                </div>
        </div>
    )
}