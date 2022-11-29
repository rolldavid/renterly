import Searchbar from "./search/components/SearchBar"
import styles from "@/styles/Home.module.css"

export default function Page() {
    return (
        <div className={styles.searchContainer}>
            <Searchbar />
        </div>
    )
}