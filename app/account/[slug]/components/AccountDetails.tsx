import Image from "next/image"
import { User } from "@prisma/client"
import styles from "./AccountDetails.module.css"

export default function AccountDetails({user, session} : { user: User, session: boolean }) {

    if (!session) {
        return (
            <div className={styles.container}>
            <h1 className={styles.displayName}>
                {user.displayName}
            </h1>
        </div>
        )
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.displayNameSession}>
                <h1 className={styles.nameTitle}>
                    {user.displayName}
                </h1>
                <div className={styles.editContainer}>
                    <Image 
                        src="/images/icons/edit.png" 
                        width={18}
                        height={18}
                        alt="edit button"
                        className={styles.editButton}
                    />
                </div>
            </h1>
            <div className={styles.locationContainer}>
                <h2 className={styles.locationTitle}>{user.citystate}</h2>
                <div className={styles.editContainer}>
                    <Image 
                        src="/images/icons/edit.png" 
                        width={18}
                        height={18}
                        alt="edit button"
                        className={styles.editButton}
                    />
                </div>
            </div>
        </div>
        
    )
}