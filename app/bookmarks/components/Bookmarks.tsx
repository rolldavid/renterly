"use client"
import { BookmarkList } from "../types"
import BookmarkCard from "./BookmarkCard"
import styles from "./Bookmarks.module.css"

export default function Bookmarks({ isLoggedIn, bookmarks }: BookmarkList) {

    if (bookmarks) {
        return (
            <div className={styles.container}>

                <div className={styles.innerContainer}>
                    
                    {
                        bookmarks.map((bookmark, index) => {
                            return <BookmarkCard bookmark={bookmark} key={index}/>
                        })
                    }
                </div>
            </div>
        )
    }

    return null;
   
}