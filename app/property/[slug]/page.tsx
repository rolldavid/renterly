import { prisma } from "@/lib/prisma"

import Image from "next/image"
import Reviews from "./components/Reviews"
import Spinner from "./utils/Spinner"
import styles from "@/styles/Property.module.css"

export default async function Page({params: {slug}}: {params: { slug: string }}) {
    const property = await prisma.property.findUnique({where: {slug: slug} })

    if (property) {
    return (
        <div className={styles.container}>
                <h1 className={styles.propertyTitle}>{property.street} {property.unit}</h1>
                <h3 className={styles.propertySubtitle}>{property.city} {property.state} {property.zipcode}</h3>
                <div className={styles.starContainer}>{[...Array(5)].map((star, index) => {        
                
                            return (         
                            <span 
                                className={styles.starMapItem}
                                key={index}
                            >
                                <Image 
                                        src={"/emptyStar.png"} 
                                        width={30} 
                                        height={30} 
                                        alt="rating star" 
                                        className={styles.starItem}
                                    />
                            </span>        
                            );
                        })}
                        </div>
                <Reviews slug={slug} property={property}/>
        </div>
    )
    }
    return null;
    
}





