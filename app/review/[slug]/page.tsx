
import { prisma } from "@/lib/prisma";
import ReviewInput from "../components/ReviewInput";
import { getPropertySlug } from "@/lib/db-utils";
import styles from "@/styles/Review.module.css"

export default async function Page({params: {slug}}: {params: { slug: string }}) {
    const property = await prisma.property.findUnique({ where: { slug: slug }})
   
    if (property) {
        return (
            <div className={styles.container}>
                <ReviewInput property={property}/>
            </div>
        )
    }

    return <div>Nothing to see here...</div>
}