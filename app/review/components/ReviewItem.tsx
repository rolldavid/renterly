"use client"

import Image from "next/image"
import Link from "next/link"
import { Review } from "@prisma/client"
import { UserList } from "./types"
import styles from "./ReviewItem.module.css"

export default function ReviewItem({review, user} : {review: Review, user: UserList}) {

    const readableDate = new Date(review.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

    let starTracker = 0;

    if (user) {
        return (
            <div className={styles.container}>
                <div className={styles.profileContainer}>
                    <Link href={`/account/${user?.userId}`}>
                        <Image src={`/images/profile/${user.image}.png`} width={48} height={48} alt="profile placeholder"/>
                    </Link>
                    <div className={styles.profileDetails}>
                        <Link href={`/account/${user?.userId}`}>
                            <h3 className={styles.profileName}>{user.displayName}</h3>
                        </Link>
                        <p className={styles.profileLocation}>{user.citystate}</p>
                    </div>
                </div>
                <div className={styles.starContainer}>
                        <div className={styles.starDetails}>
                            {[...Array(5)].map((star, index) => {      
                                    if (starTracker < review.stars) {
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

    return null;

   
}