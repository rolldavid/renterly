import { SearchProps } from "./types";
import SearchItem from "./SearchItem"
import styles from "./SearchResults.module.css"

export default function SearchResults({results}: {results: SearchProps[]}) {
    return (
            <div className={styles.container}>
                {results.map((result, index) => {
                    return <SearchItem key={index} result={result}/>
                })}
            </div>
    )
}