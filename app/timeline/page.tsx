import { prisma } from "@/lib/prisma"
import Recent from "./components/Recent"

export default async function Page() {
    const review = await prisma.review.findMany({
        orderBy: {
            createdAt: "desc"
        }, 
        take: 1
    })

    if (review[0].id) {
        return <Recent index={review[0].id}/>
    }
    return null;
}