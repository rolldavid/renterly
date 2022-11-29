import styles from "./SearchItem.module.css"
import { SearchProps } from "./types"
export default function ResultItem({result, expandSecondary, searchTerm}: {result: SearchProps, expandSecondary: (address: string, term: string) => {}, searchTerm: string}) {
    if (result.secondary) {
        
        if (result.entries > 1) {
            if (!result.secondary.includes("entries")) {
            result.secondary += ` (${result.entries} entries)`
            } 
        } 
      const pureSecondary = result.secondary.replace(`(${result.entries} entries)`, "").trim()
      console.log("pure secondary", pureSecondary)
      const address = `${result.street_line} ${pureSecondary} (${result.entries}) ${result.city} ${result.state} ${result.zipcode}`
      return (
        <div className={styles.container} onClick={() => expandSecondary(address, searchTerm)}>
            {`${result.street_line} ${result.secondary} ${result.city} ${result.state} ${result.zipcode}`}
        </div>
      ) 
    }

    return (
        <div className={styles.container}>
            {`${result.street_line} ${result.city} ${result.state} ${result.zipcode}`}
        </div>
    )
}

