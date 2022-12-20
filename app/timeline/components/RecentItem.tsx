"use client"

import Image from "next/image"
import Link from "next/link"
import { Review, Star } from "@prisma/client"
import styles from "./RecentItem.module.css"
import { InfiniteReviewProps } from "./types"


export default function ReviewItem({review} : {review: InfiniteReviewProps}) {

    const readableDate = new Date(review.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    
    const starCount = review.stars[0].stars

    let starTracker = 0;

        return (
            <div className={styles.container}>
                <div className={styles.profileContainer}>
                    <Link href={`/account/${review.userId}`}>
                        <Image src={`/images/profile/${review.userImage}.png`} width={48} height={48} alt="profile placeholder"/>
                    </Link>
                    <div className={styles.profileDetails}>
                        <Link href={`/account/${review.userId}`}>
                            <h3 className={styles.profileName}>{review.displayName}</h3>
                        </Link>
                        <p className={styles.profileLocation}>{review.citystate}</p>
                    </div>
                </div>
                <div className={styles.starContainer}>
                        <div className={styles.starDetails}>
                            {[...Array(5)].map((star, index) => {    
                                    if (starTracker < starCount) {
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
                <div className={styles.locationContainer}>
                    283 SE Main St, Portland, OR
                </div>
            </div>
        )
    
}

   
