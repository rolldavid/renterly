"use client"

import { useState } from "react"
import Image from "next/image"
import Search from "./search/components/Search"
import styles from "@/styles/Search.module.css"
import Spinner from "@/lib/utils/Spinner"

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
                            <Image src={"/images/search/house.png"} width={240} height={263} alt="illustration of a house"/>
                        </div>
                    </section>
                </section>}
            {loading && <div className={styles.loadingFull}>
                <Spinner />
                </div>}
        </>
    )
}