"use client"

import Image from "next/image";
import { SyntheticEvent, useState, useEffect } from "react"
import { ProfileUser } from "app/account/types";
import styles from "./AccountDetails.module.css"
import EditProfile from "./EditProfile";


export default function AccountDetails({user, session} : { user: ProfileUser, session: boolean }) {
    const [editProfile, setEditProfile] = useState(false)
    const [city, setCity] = useState("")

    if (!session) {
        return (
            <div className={styles.container}>
            <h1 className={styles.displayName}>
                {user.displayName}
            </h1>
        </div>
        )
    }

    if (session && user.userId) {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image 
                    src={`/images/profile/${user.image}.png`} 
                    width={100} 
                    height={100} 
                    alt="profile" 
                    className={styles.profileImage}
                />
            </div>
            <div className={styles.displayNameSession}>
                <h1 className={styles.nameTitle}>
                    {user.displayName}
                </h1>
                
            </div>
            <div className={styles.locationContainer}>
                <h2 className={styles.locationTitle}>{user.citystate}</h2>
                
            </div>
            {editProfile && <EditProfile user={user} setEditProfile={setEditProfile}/>}
            <div className={styles.editContainer}>
                    <Image 
                        src="/images/icons/edit.png" 
                        width={18}
                        height={18}
                        alt="edit button"
                        className={styles.editButton}
                        onClick={() => setEditProfile(prev => !prev)}
                    /> 
            </div>
        </div>
    )
    }
    return null;
}