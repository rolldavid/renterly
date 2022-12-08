import { prisma } from "@/lib/prisma";
import { Property } from "@prisma/client";
import ReviewInput from "./components/ReviewInput";

export default async function Page({searchParams} : {searchParams?: { [key: string]: string | undefined };}) {
    if (searchParams) {
    
        const property = await prisma.property.findUnique({where: {slug: searchParams.slug} })
        
            if (property) {
                return (
                    <div>
                        <ReviewInput property={property}/>
                    </div>
                )
            }
    }

    return null;
}