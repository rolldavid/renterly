import Image from "next/image"

import { Review } from "@prisma/client"
import styles from "./ReviewItem.module.css"

export default function ReviewItem({review} : {review: Review}) {
    return (
        <div className={styles.container}>
            <div className={styles.profileContainer}>
                <Image src={"/profile.png"} width={50} height={50} alt="profile placeholder"/>
                <div className={styles.profileDetails}>
                    <h3 className={styles.profileName}>Peter P.</h3>
                    <p className={styles.profileLocation}>Portland, OR</p>
                </div>
            </div>
            <div className={styles.starContainer}>
                    <div className={styles.starDetails}>
                        <Image src={"/fullStar.png"} width={20} height={20} alt="rating star" className={styles.starItem}/>
                        <Image src={"/fullStar.png"} width={20} height={20} alt="rating star" className={styles.starItem}/>
                        <Image src={"/fullStar.png"} width={20} height={20} alt="rating star" className={styles.starItem}/>
                        <Image src={"/emptyStar.png"} width={20} height={20} alt="rating star" className={styles.starItem}/>
                        <Image src={"/emptyStar.png"} width={20} height={20} alt="rating star" className={styles.starItem}/>
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