"use client"

import { useQuery } from "@tanstack/react-query"
import { getBookmarks } from "@/lib/db-utils"
import Bookmarks from "./components/Bookmarks"
import Spinner from "@/lib/utils/Spinner"

export default function Page() {
    const {data, status} = useQuery(["allBookmarks"], () => {
        return getBookmarks()
    })

    if (status === "loading") {
        return <Spinner />
    }

    if (status === "success" && data.isLoggedIn && data.bookmarks) {
        return (
            <Bookmarks isLoggedIn={true} bookmarks={data.bookmarks}/>
        )
    }

    if (status === "success" && !data.isLoggedIn) {
        return (
            <Bookmarks isLoggedIn={false}/>
        )
    }
    
}