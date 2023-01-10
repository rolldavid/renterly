
import { prisma } from "@/lib/prisma"

import Header from "./components/Header"
import Stars from "app/review/components/Stars"
import Reviews from "../../review/components/Reviews"
import styles from "@/styles/Property.module.css"

export default async function Page({params: {slug}}: {params: { slug: string }}) {
    const property = await prisma.property.findUnique({
        where: {slug: slug},
    })
    
    console.log(property, "========================================")
    if (property) {
       
        const propertyDetails = {
            id: property.id,
            unit: property.unit,
            street: property.street,
            city: property.city,
            state: property.state,
            slug: property.slug
        }

        return (
            <div className={styles.container}>
                    <Header property={property}/>
                    <Stars propertyId={property.id}/>
                    <Reviews property={propertyDetails}/>
            </div>
    )
    }
    return null;
}


