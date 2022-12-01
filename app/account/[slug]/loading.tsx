import Spinner from "../../property/[slug]/utils/Spinner"
import styles from "@/styles/Property.module.css"
export default function Loading() {
    return (
        <div className={styles.container}>
            <Spinner />
        </div>
    )

}

