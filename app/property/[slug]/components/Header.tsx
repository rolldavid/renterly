import Image from "next/image";
import { Property } from "@prisma/client";
import styles from "./Header.module.css"

export default function Header({property} : {property: Property}) {
    return (
        <>
            <h1 className={styles.propertyTitle}>{property.street} {property.unit}</h1>
            <h3 className={styles.propertySubtitle}>{property.city} {property.state} {property.zipcode}</h3>
        </>
    )
}