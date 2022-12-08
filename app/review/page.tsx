import { prisma } from "@/lib/prisma";
import ReviewInput from "./components/ReviewInput";


export default async function Page({searchParams} : {searchParams?: { [key: string]: string | undefined };}) {

    const property = await prisma.property.findUnique({
        where: {
            slug: searchParams?.slug
        }
    })
    if (property) {
        return <ReviewInput property={property}/>
    }
   
    return null;
}