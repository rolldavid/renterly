import { prisma } from "@/lib/prisma"

import Header from "./components/Header"
import Stars from "app/review/components/Stars"
import Reviews from "../../review/components/Reviews"
import styles from "@/styles/Property.module.css"

export default async function Page({params: {slug}}: {params: { slug: string }}) {
    const property = await prisma.property.findUnique({where: {slug: slug} })
    
    if (property) {
        return (
            <div className={styles.container}>
                    <Header property={property}/>
                    <Stars />
                    <Reviews property={property}/>
            </div>
    )
    }
    return null;
}





