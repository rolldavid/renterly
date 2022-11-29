"use client"

import React, { useState, useRef, useEffect } from "react";
import { SearchProps } from "./types";
import styles from "./Search.module.css"
import SearchItem from './SearchItem'

let timeoutId: ReturnType<typeof setTimeout>;

export default function Search() {
   
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
        if (searchTerm.length >= 5) {
            const res = await fetch(`https://us-autocomplete-pro.api.smartystreets.com/lookup?key=${process.env.NEXT_PUBLIC_SMARTY_KEY}&search=${searchTerm}&max_results=5`)
            const data = await res.json();
            setResults(data.suggestions)
        }
      }
      timeoutId = setTimeout(handleLookup, 500)

    }, [searchTerm])

    const expandSecondary = async (address: string, term: string) => {
        console.log("...looking up secondary data...")
        const res = await fetch(`https://us-autocomplete-pro.api.smartystreets.com/lookup?key=${process.env.NEXT_PUBLIC_SMARTY_KEY}&search=${term}&selected=${address}`)
        const data = await res.json();
        console.log("here are the extra results ========", data)
        setResults(data.suggestions)
      }

    return(
        <section className={styles.container}>
            <div>
                <input 
                    name="search"
                    value={searchTerm} 
                    className={styles.searchbar} 
                    onChange={e => setSearchTerm(e.target.value)}
                    ref={searchRef}
                />
            </div>
            {results &&
                    <div className={styles.resultsContainer}>
                    {results.map((result, index) => {
                        return <SearchItem key={index} result={result} expandSecondary={expandSecondary} searchTerm={searchTerm}/>
                    })}
                </div>
            }
        </section>
        
    )
}

