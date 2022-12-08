"use client"

import { useQuery } from "@tanstack/react-query"

import { Review } from "@prisma/client"

import { getSessionProperty } from "@/lib/db-utils"
import ReviewList from "./ReviewList"
import ReviewInput from "./ReviewInput"
import { Property } from "@prisma/client"
import Spinner from "../utils/Spinner"
import styles from "./Reviews.module.css"


export default function Reviews({slug, property}: {slug: string, property: Property}) {
    const {data, status} = useQuery(["sessionPost"], () => {
        return getSessionProperty(property.id)
    })

    if (status === "loading") {
        return (
            <Spinner />
        )
    }
    if (status === "success" && slug === property.slug) {
        const revList: Review[] = data.reviews
        if (revList) {
            return (
                <>
                <ReviewList reviewList={revList}/>
             <ReviewInput isLoggedIn={data.id ? true : false} slug={slug} userId={data.id} propertyId={property.id}/> 
             </>
            )
        } else {
        return (
                <ReviewInput isLoggedIn={data.id ? true : false} slug={slug} userId={data.id} propertyId={property.id}/> 
        
        )}
}
    return null
}