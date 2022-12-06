"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getSession, getUserId } from "@/lib/db-utils"
import ReviewInput from "./ReviewInput"

export default function Reviews({slug}: {slug: string}) {
    const {data, status} = useQuery(["session"], () => {
        return getUserId()
    })

    if (status === "success") {
        console.log(data)
        return (
            <>
                <ReviewInput isLoggedIn={data.id ? true : false} slug={slug}/> 
            </>
        
    )}

    return null

}