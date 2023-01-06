"use client"

import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { SearchProps } from "../types";
import styles from "./Search.module.css"
import SearchItem from './SearchItem'

let timeoutId: ReturnType<typeof setTimeout>;

export default function Search({setLoading} : {setLoading: Dispatch<SetStateAction<boolean>>}) {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [results, setResults] = useState<SearchProps[] | null>(null)
    const searchRef = useRef(null)

    useEffect(() => {
      if (timeoutId) clearTimeout(timeoutId)
    
      const handleLookup = async () => {
        if (!searchTerm) {
            setResults(null)
            return
        }
        if (searchTerm.length >= 4) {
            const res = await fetch(`https://us-autocomplete-pro.api.smartystreets.com/lookup?key=${process.env.NEXT_PUBLIC_SMARTY_KEY}&search=${searchTerm}&max_results=5`)
            const data = await res.json();
            setResults(data.suggestions)
        }
      }
      timeoutId = setTimeout(handleLookup, 350)

    }, [searchTerm])

    const expandSecondary = async (address: string, term: string) => {
        const res = await fetch(`https://us-autocomplete-pro.api.smartystreets.com/lookup?key=${process.env.NEXT_PUBLIC_SMARTY_KEY}&search=${term}&selected=${address}`)
        const data = await res.json();
        setResults(data.suggestions)
      }


    return(
        <section className={styles.container}>
            <section className={styles.searchContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>A voice for every renter</h1>
                </div>
                <div className={styles.searchbarContainer}>
                        <input 
                            name="search"
                            value={searchTerm} 
                            className={styles.searchbar}
                            onChange={e => setSearchTerm(e.target.value)}
                            ref={searchRef}
                            placeholder="Search & review any US address . . ."
                        />
                </div>
            </section>
            {results &&
                    <div className={styles.resultsContainer}>
                        <div className={styles.resultsDetail}>
                        {results.map((result, index) => {
                        
                        return <SearchItem 
                            key={index} 
                            result={result} 
                            expandSecondary={expandSecondary} 
                            searchTerm={searchTerm}
                            setLoading={setLoading}
                        />
                    })}
                        </div>
                </div>
            }
        </section>
        
    )
}

