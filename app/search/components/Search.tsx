"use client"

import React, { useState, useRef, useEffect } from "react";
import styles from "./Search.module.css"

export default function Search() {
   
    const [searchTerm, setSearchTerm] = useState<string>("")
    const searchRef = useRef(null)

    useEffect(() => {
      const handleLookup = async () => {
        const res = await fetch(`https://us-autocomplete-pro.api.smartystreets.com/lookup?key=${process.env.SMARTY_EMBEDDED_KEY}&search=${searchTerm}`)
        const data = await res.json();
        console.log(data)
      }
      handleLookup()
    }, [searchTerm])


    return(
        <div>
            <input 
                name="search"
                value={searchTerm} 
                className={styles.searchInput} 
                onChange={e => setSearchTerm(e.target.value)}
                ref={searchRef}
            />
        </div>
        
    )
}

