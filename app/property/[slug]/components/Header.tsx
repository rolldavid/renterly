import Image from "next/image";
import { Property } from "@prisma/client";
import styles from "./Header.module.css"

export default function Header({property} : {property: Property}) {
    return (
        <>  
            <Image src={`/images/property/${property.couch}.png`} height="80" width="146" alt="couch" className={styles.couch}/>
            <h1 className={styles.propertyTitle}>{property.street} {property.unit}</h1>
            <h3 className={styles.propertySubtitle}>{property.city} {property.state} {property.zipcode}</h3>
        </>
    )
}