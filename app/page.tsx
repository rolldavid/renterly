import Image from "next/image"
import Search from "./search/components/Search"
import house from "./assets/house.png"

import styles from "@/styles/Home.module.css"

export default function Page() {
    return (
        <section className={styles.searchContainer}>
            <div className={styles.landingSearch}>
                <Search />
            </div>
            <div className={styles.landingImg}>
                <Image src={house} width={221} height={241} alt="house illustration"/>
            </div>
            
        </section>
    )
}