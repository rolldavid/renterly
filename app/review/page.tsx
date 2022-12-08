"use client"
import { prisma } from "@/lib/prisma";
import ReviewInput from "./components/ReviewInput";
import { useQuery } from "@tanstack/react-query";
import { getPropertySlug } from "@/lib/db-utils";
import Spinner from "@/lib/utils/Spinner";

export default function Page({searchParams} : {searchParams?: { [key: string]: string | undefined };}) {
    const { data, status } = useQuery(["property"], () => {
        if (searchParams && searchParams.slug) {
            return getPropertySlug(searchParams.slug)
        }
    })

    if (status === "loading") {
        return <Spinner />
    }

    if (status === "success" && data) {
        return (
            <div>
                <ReviewInput property={data.property}/>
            </div>
        )
    }
   
    return null;
}