import Image from "next/image";

import styles from "./Stars.module.css"

export default function Stars({ stars } : { stars: number[]}) {
    const average = stars.reduce((a, b) => a + b, 0) / stars.length;
    const quotient = Math.floor(average / .5)
    let starTracker = quotient;

    return (
        <div className={styles.starContainer}>{[...Array(5)].map((star, index) => {       
            if (starTracker > 0) {
                if (starTracker - 2 >= 0) {
                    starTracker -= 2
                    return (         
                        <Image 
                                src={"/images/review/fullStar.png"} 
                                width={30} 
                                height={30} 
                                alt="rating star" 
                                className={styles.starRatingImg}
                                key={index}
                            />     
                    );
                } 

                starTracker -= 1
                return (         
                    <Image 
                            src={"/images/review/halfStar.png"} 
                            width={30} 
                            height={30} 
                            alt="rating star" 
                            className={styles.starRatingImg}
                            key={index}
                        />     
                );
            }
            return (         
                <Image 
                        src={"/images/review/emptyStar.png"} 
                        width={30} 
                        height={30} 
                        alt="rating star" 
                        className={styles.starRatingImg}
                        key={index}
                    />     
            );
            
        })}
    </div>
    )
}