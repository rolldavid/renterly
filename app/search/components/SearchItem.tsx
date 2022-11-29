import styles from "./SearchItem.module.css"
import { SearchProps } from "./types"
export default function ResultItem({result}: {result: SearchProps}) {
    return (
        <div className={styles.container}>
            <p className={styles.resultItem}>{result.street_line}</p>
            <p className={styles.resultItem}>{result.secondary}</p>
            <p className={styles.resultItem}>{result.city}</p>
            <p className={styles.resultItem}>{result.state}</p>
            <p className={styles.resultItem}>{result.zipcode}</p> 
        </div>
    )
}