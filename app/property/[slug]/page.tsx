import { prisma } from "@/lib/prisma"
import styles from "@/styles/Property.module.css"

export default async function Page({params: {slug}}: {params: { slug: string }}) {

    const property = await prisma.property.findUnique({where: {slug: slug} })
  
    if (property) {
    return (
        <div className={styles.container}>
            <h2>{property.street} ${property.unit}</h2>
            <h4>{property.city} {property.state} {property.zipcode}</h4>
            <div>
                {property.stars}
            </div>
        </div>
    )
    }
    return (
        <div>
            Welcome to property <h2>Hey!</h2>
        </div>
    )
    
}


