"use client"
import Link from "next/link"
import { BookmarkList } from "../types"
import BookmarkCard from "./BookmarkCard"
import { placeholder } from "./Placeholder"
import styles from "./Bookmarks.module.css"

export default function Bookmarks({ isLoggedIn, bookmarks }: BookmarkList) {

    if (bookmarks && bookmarks.length > 0 && isLoggedIn) {
        return (
            <div className={styles.container}>
                <p className={styles.placeholderTitle}>Following</p>
                <div className={styles.innerContainer}>
                    
                    {
                        bookmarks.map((bookmark, index) => {
                            return <BookmarkCard bookmark={bookmark} key={index} placeholder={false}/>
                        })
                    }
                </div>
            </div>
        )
    }

    
        return (
            <div className={styles.placeholderContainer}>
                <p className={styles.placeholderTitle}>You&apos;re not following any properties yet</p>
                
                <Link href="/" className={styles.searchLink}>
                    Search Properties
                </Link>
                <div className={styles.innerContainer}>
                    {
                        placeholder.map((bookmark, index) => {
                            return <BookmarkCard bookmark={bookmark} key={index} placeholder={true}/>
                        })
                    }
                </div>
            </div>
        )

   
}