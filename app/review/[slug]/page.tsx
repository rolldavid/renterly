
import { prisma } from "@/lib/prisma";
import ReviewInput from "../components/ReviewInput";
import { getPropertySlug } from "@/lib/db-utils";

export default async function Page({params: {slug}}: {params: { slug: string }}) {
    const property = await prisma.property.findUnique({ where: { slug: slug }})
   
    if (property) {
        return <ReviewInput property={property}/>
    }

    return <div>Nothing to see here...</div>
}