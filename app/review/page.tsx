"use client"

import { useQuery } from "@tanstack/react-query";
import ReviewInput from "./components/ReviewInput";
import { getPropertySlug } from "@/lib/db-utils";

export default function Page({searchParams} : {searchParams?: { [key: string]: string | undefined };}) {
    const slugParam = searchParams?.slug ? searchParams.slug : "1212-1-2-12th-st-oroville-CA-95965"
 
    const {data, status} = useQuery(["reviewProp"], () => {
        const res = getPropertySlug(slugParam)
        console.log("what I found....", res)
        return res
    })

    if (status === "success" && data.property) {
        return <ReviewInput property={data.property}/>
    }

  
    return <div>Nothing to see here...</div>
}