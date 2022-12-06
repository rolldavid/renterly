"use client"

import { useQuery } from "@tanstack/react-query"
import { getUserId } from "@/lib/db-utils"
import ReviewInput from "./ReviewInput"
import Spinner from "../utils/Spinner"

export default function Reviews({slug}: {slug: string}) {
    const {data, status} = useQuery(["session"], () => {
        return getUserId()
    })

    if (status === "loading") {
        return (
            <Spinner />
        )
    }
    if (status === "success") {
        return (
            <>
                <ReviewInput isLoggedIn={data.id ? true : false} slug={slug}/> 
            </>
    )}

    return null

}