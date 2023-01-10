
import { BookmarkProps } from "app/review/components/types";
import { BookmarkItem } from "../types";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import styles from "./BookmarkCard.module.css";

export default function BookmarkCard({ bookmark }: {bookmark: BookmarkItem}) {

    const queryClient = useQueryClient()

    const readableDate = new Date(bookmark.assignedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });


    const updateBookmark = useMutation(async ({propertyId, type}: BookmarkProps) => {
        return fetch("/api/update-bookmark", {
            method: "POST",
            body: JSON.stringify({
                propertyId,
                type
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        },
        {
            
            onSuccess: () => {
                queryClient.invalidateQueries(['allBookmarks'])
            },
        })


return (
        <div className={styles.card}>
            <Link className={styles.cardDetails} href={`/property/${bookmark.slug}`}>
                <p className={styles.street}>{bookmark.street}</p>
                <p className={styles.citystate}>{`${bookmark.city}, ${bookmark.state}`}</p>
            </Link>
            <div 
                className={styles.close}
                onClick={() => updateBookmark.mutate({propertyId: bookmark.propertyId, type: "remove"})}
                >
                X
            </div>
        </div>
    )

}
