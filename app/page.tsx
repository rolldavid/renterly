"use client"

import { useState } from "react"
import Image from "next/image"
import Search from "./search/components/Search"
import Spinner from "@/lib/utils/Spinner"
import house from "./search/assets/house.png"
import styles from "@/styles/Search.module.css"

export default function Page() {
    const [loading, setLoading] = useState(false)

    return (
        <>
            {!loading && <section className={styles.container}>
                    <section className={styles.innerContainer}>
                        <div className={styles.landingSearch}>
                            <Search setLoading={setLoading}/>
                        </div>
                        <div className={styles.landingImg}>
                            <Image src={house} width={240} height={263} alt="illustration of a house" className={styles.landingImage}/>
                        </div>
                    </section>
                </section>}
            {loading && <div className={styles.loadingFull}>
                <Spinner />
                </div>}
        </>
    )
}