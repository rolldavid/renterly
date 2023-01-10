"use client"

import { BookmarkProps } from "./types"
import Image from "next/image"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { checkBookmark } from "@/lib/db-utils"
import { useState, useEffect, SyntheticEvent } from "react"

import styles from "./Bookmark.module.css"

export default function Bookmark({ propertyId }: { propertyId: string }) {
    const [bookmarked, setBookmarked] = useState<"Follow" | "Following" | "">("")
    const { data, status, isFetching, isPlaceholderData, isRefetching, isStale } = useQuery(["bookmark"], () => {
        return checkBookmark(propertyId)
    })

    const queryClient = useQueryClient()
   
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
            queryClient.invalidateQueries(['bookmark'])
          },
    })

  

    if (isFetching || isPlaceholderData || isRefetching) {
        return (
            <div className={styles.followButton}> 
                <div className={styles.dotWrap}>
                    <div className={styles.dotFlashing}></div>
                </div>
            </div>
        )
    }
   

    if (status === "loading") {
        <div className={styles.followButton}> 
                <div className={styles.dotWrap}>
                    <div className={styles.dotFlashing}></div>
                </div>
            </div>
    }

    
    if (status === "success" && data.isBookmarked) {
        return (
            <>
            {updateBookmark.isLoading ? (<div className={styles.followButton}> 
                <div className={styles.dotWrap}>
                    <div className={styles.dotFlashing}></div>
                </div>
            </div>) : (
                <div 
                className={styles.followButton}
                onClick={() => updateBookmark.mutate({propertyId, type: "remove"})}
            > Following
            </div>
            )}
            </>
        )
    }


    return (
        <>
            {updateBookmark.isLoading ? (
                <div className={styles.followButton}> 
                <div className={styles.dotWrap}>
                    <div className={styles.dotFlashing}></div>
                </div>
            </div>
            ) : (
              
                 <div 
                className={styles.followButton}
                onClick={() => {
                    updateBookmark.mutate({propertyId, type: "add"})
                }}
            >
                <Image 
                    src="/images/icons/plus.png" 
                    width="12" 
                    height="12" 
                    alt="plus sign"
                    className={styles.followImg}/> Follow
            </div>
            
            )}
        </>
    )
    
}