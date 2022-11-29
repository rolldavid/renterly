"use client"

import React, { useState, useRef, useEffect } from "react";
import { SearchProps } from "./types";
import styles from "./Search.module.css"
import SearchResults from "./SearchResults";

export default function Search() {
   
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [results, setResults] = useState<SearchProps[] | null>(null)
    const searchRef = useRef(null)

    useEffect(() => {
      const handleLookup = async () => {
        if (!searchTerm) {
            setResults(null)
            return
        }
        const res = await fetch(`https://us-autocomplete-pro.api.smartystreets.com/lookup?key=${process.env.NEXT_PUBLIC_SMARTY_KEY}&search=${searchTerm}`)
        const data = await res.json();
        setResults(data.suggestions)
    
      }
      handleLookup()
    }, [searchTerm])


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
                    <SearchResults results={results}/>
            }
        </section>
        
    )
}

