"use client"

import { BookmarkProps } from "../types"
import { useEffect, useState, useRef, SyntheticEvent } from "react"
import Image from "next/image"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { checkBookmark } from "@/lib/db-utils"
import AuthContainer from "../../auth/components/AuthContainer"
import plus from "../assets/plus.png"
import check from "../assets/check.png"

import styles from "./BookmarkButton.module.css"

export default function Bookmark({ propertyId }: { propertyId: string }) {
    
    const { data, status, isFetching, isPlaceholderData, isRefetching, isStale } = useQuery(["bookmark"], () => {
        return checkBookmark(propertyId)
    })

    const [showAuth, setShowAuth] = useState(false)

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (status === "success" && data.session) {
            setShowAuth(false)
        }
    }, [data])

    const handleModalClose = (e: MouseEvent) => {
        e.preventDefault()
        if (e.target instanceof Element) {
            if (ref.current?.classList[0] === e.target.classList[0]) {
                setShowAuth(false)
            }
        }
    }

    useEffect(() => {
        const element = ref.current
        if (showAuth && element) {
            element.addEventListener("click", e => handleModalClose(e))
        }
     
        return () => {
            if (element) {
            element.removeEventListener("click", e => handleModalClose(e))
            }
        }
    }, [showAuth])

    

    const queryClient = useQueryClient()
   
    const handleBookmark = (mutateObj: BookmarkProps, e: SyntheticEvent) => {
        e.preventDefault()
        if (status === "success" && !data.session) {
            setShowAuth(true)
            return;
        }

        updateBookmark.mutate(mutateObj)

    }

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


    if (isFetching || isPlaceholderData || isRefetching || status === "loading") {
        return (
            <div className={styles.followButton}> 
                    <div className={styles.dotWrap}>
                        <div className={styles.dotFlashing}></div>
                    </div>
            </div>
        )
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
                > <Image 
                    src={check}
                    width="12" 
                    height="12" 
                    alt="checkmark"
                    className={styles.followingImg}/> Following
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
                onClick={(e) => handleBookmark({propertyId, type: "add"}, e)}
            >
                <Image 
                    src={plus}
                    width="12" 
                    height="12" 
                    alt="plus sign"
                    className={styles.followImg}/> Follow
            </div>
            
            )}
            {showAuth &&
                    <div className={styles.authModuleContainer} ref={ref}>
                        <div className={styles.authModule}>
                            <AuthContainer fromReview={false}/>
                        </div>
                    </div>
                }
        </>
    )
    
}