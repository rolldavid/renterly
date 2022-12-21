"use client"

import { useState } from "react"
import Image from "next/image"
import Search from "./search/components/Search"
import house from "./assets/house.png"

import styles from "@/styles/Search.module.css"
import Spinner from "@/lib/utils/Spinner"

export default function Page() {
    const [loading, setLoading] = useState(false)

    return (
        <>
            {!loading && <section className={styles.container}>
                <div className={styles.landingSearch}>
                    <Search setLoading={setLoading}/>
                </div>
                <div className={styles.landingImg}>
                    <Image src={house} width={221} height={241} alt="illustration of a house"/>
                </div>
            </section>}
            {loading && <div className={styles.loadingFull}>
                <Spinner />
                </div>}
        </>
    )
}