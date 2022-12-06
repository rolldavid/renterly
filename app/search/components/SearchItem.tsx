"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"

import styles from "./SearchItem.module.css"
import { SearchProps } from "../types"
export default function ResultItem({result, expandSecondary, searchTerm, setLoading}: {result: SearchProps, expandSecondary: (address: string, term: string) => {}, searchTerm: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>}) {
    const router = useRouter()

    const handleClick = async (e: SyntheticEvent, url: string, unit: boolean) => {
        setLoading(true)
        e.preventDefault();

        if (!unit) {
            const res = await fetch("/api/check-property", {
                method: "POST",
                body: JSON.stringify({
                    property: {
                        slug: url,
                        stars: 2,
                        street: result.street_line,
                        unit: "",
                        city: result.city,
                        state: result.state,
                        zipcode: result.zipcode
                    }
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            router.push(`/property/${url}`)
        } else {
            const res = await fetch("/api/check-property", {
                method: "POST",
                body: JSON.stringify({
                    property: {
                        slug: url,
                        stars: 2,
                        street: result.street_line,
                        unit: result.secondary,
                        city: result.city,
                        state: result.state,
                        zipcode: result.zipcode
                    }
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            router.push(`/property/${url}`)
        }
        
    }

    const street = result.street_line.replaceAll(" ", "-").replaceAll("/", "-").trim().toLowerCase()
    const city = result.city.replaceAll(" ", "-").trim().toLowerCase()
    const state = result.state.replaceAll(" ", "").trim().toUpperCase()
    const zipcode = result.zipcode.replaceAll(" ", "").trim()
    
    if (result.secondary) {
    
        if (result.entries > 1) {
            if (!result.secondary.includes("entries")) {
            result.secondary += ` (${result.entries} entries)`
            } 
        
            const pureSecondary = result.secondary.replace(`(${result.entries} entries)`, "").trim()
            const address = `${result.street_line} ${pureSecondary} (${result.entries}) ${result.city} ${result.state} ${result.zipcode}`
            return (
                <div className={styles.container} onClick={() => expandSecondary(address, searchTerm)}>
                        {`${result.street_line} ${result.secondary} ${result.city} ${result.state} ${result.zipcode}`}
                </div>
            ) 
        } 
        if (result.entries === 1) {
            const unit = result.secondary.replaceAll(" ", "-").replaceAll("/", "-").trim()

            return (
                    <div onClick={(e) => handleClick(e, `${street}-${unit}-${city}-${state}-${zipcode}`, true)} className={styles.container}>
                        {`${result.street_line} ${result.secondary} ${result.city} ${result.state} ${result.zipcode}`}
                    </div>
            ) 
        }
    }


    return (
        <>
            <div onClick={(e) => handleClick(e, `${street}-${city}-${state}-${zipcode}`, false)} className={styles.container}>
                {`${result.street_line} ${result.city} ${result.state} ${result.zipcode}`}
            </div>
            
        </>
            
    )
}

