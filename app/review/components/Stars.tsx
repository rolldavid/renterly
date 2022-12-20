"use client"

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getStars } from "@/lib/db-utils";
import Spinner from "@/lib/utils/Spinner";
import styles from "./Stars.module.css"
import { Star } from "@prisma/client";


export default function Stars({ propertyId }: {propertyId: string}) {
    const { data, status } = useQuery(["stars"], () => {
        return getStars(propertyId)
    })


    if (status === "loading") {
        return <Spinner />
    }

    if (status === "success") {
    
        const mappedStars: number[] = data.stars.map((star: Star) => star.stars)
        const average = mappedStars.reduce((a, b) => a + b, 0) / data.stars.length;
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
    return null;
}