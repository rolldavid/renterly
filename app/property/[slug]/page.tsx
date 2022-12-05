import { prisma } from "@/lib/prisma"

import Reviews from "./components/Reviews"
import Spinner from "./utils/Spinner"
import styles from "@/styles/Property.module.css"

export default async function Page({params: {slug}}: {params: { slug: string }}) {
    const property = await prisma.property.findUnique({where: {slug: slug} })

    if (property) {
    return (
        <div className={styles.container}>
                <h1>{property.street} {property.unit}</h1>
                <h3>{property.city} {property.state} {property.zipcode}</h3>
                <div>
                    {property.stars}
                </div>
                <Reviews slug={slug}/>
        </div>
    )
    }
    return null;
    
}





