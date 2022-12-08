
import { prisma } from "@/lib/prisma";
import ReviewInput from "./components/ReviewInput";

export default async function Page({searchParams} : {searchParams?: { [key: string]: string | undefined };}) {
    const slugParam = searchParams?.slug ? searchParams.slug : "1212-1-2-12th-st-oroville-CA-95965"
    const property = await prisma.property.findUnique({
        where: {
            slug: slugParam
        }
    })
    if (property) {
        return <ReviewInput property={property}/>
    }
   
    return null;
}