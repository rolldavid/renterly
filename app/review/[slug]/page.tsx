"use client"

import { useQuery } from "@tanstack/react-query";
import { usePathname } from 'next/navigation';
import { getReviewPage } from "@/lib/db-utils";
import ReviewInput from "../components/ReviewInput";
import styles from "@/styles/Review.module.css"
import Loading from "./loading";

export default function Page() {
    const pathname = usePathname();
    let parsedPath: string;
    if (pathname) {
        parsedPath = pathname.replace("/review/", "")
    }

    const { data, status } = useQuery(["reviewPage"], () => {
        const res = getReviewPage(parsedPath)
        return res;
    })

    if (status === "loading") {
        return <Loading />
    }
   
    if (status === "success" && data.property) {
        return (
            <div className={styles.container}>
                <ReviewInput 
                    property={data.property} 
                    editingReview={data.editingReview} 
                    comment={data.comment} 
                    stars={data.stars}
                    reviewId={data.reviewId}
                    starId={data.starId}
                />
            </div>
        )
    }

    return null;
}