import Search from "./search/components/Search"
import styles from "@/styles/Home.module.css"

export default function Page() {
    return (
        <div className={styles.searchContainer}>
            <Search />
        </div>
    )
}