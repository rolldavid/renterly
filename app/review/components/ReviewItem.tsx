"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Review, User } from "@prisma/client"
import { getUser } from "@/lib/db-utils"
import styles from "./ReviewItem.module.css"

interface UserData {
    session: boolean
    user: User
}

export default function ReviewItem({review} : {review: Review}) {
    const [user, setUser] = useState<UserData | null>(null)
    useEffect(() => {
        const getUserData = async () => {
            const res = await getUser(review.userId)
            setUser(res)
        }
        getUserData()
    }, [])
    let starTracker = 0;

    if (user) {
        console.log(user)
        return (
            <div className={styles.container}>
                <div className={styles.profileContainer}>
                    <Image src={`/images/profile/${user.user.image}.png`} width={48} height={48} alt="profile placeholder"/>
                    <div className={styles.profileDetails}>
                        <h3 className={styles.profileName}>{user.user.displayName}</h3>
                        <p className={styles.profileLocation}>{user.user.citystate}</p>
                    </div>
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

    return null;

   
}