"use client"

import Link from "next/link";
import Image from "next/image";
import { SyntheticEvent, useState, Dispatch, SetStateAction } from "react"
import { ProfileUser } from "app/account/types";
import styles from "./AccountDetails.module.css"
import EditProfile from "./EditProfile";


export default function AccountDetails({user, accountOwner, setEditProfile} : { user: ProfileUser, accountOwner: boolean, setEditProfile: Dispatch<SetStateAction<boolean>> }) {
   
    const [city, setCity] = useState("")


    if (!accountOwner && user.image) {
        return (
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <Image 
                        src={`/images/profile/${user.image}.png`} 
                        width={140} 
                        height={140} 
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
            </div>
        )
    }

    if (accountOwner && user.userId && user.image) {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image 
                    src={`/images/profile/${user.image}.png`} 
                    width={140} 
                    height={140} 
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
            <div className={styles.optionsContainer}>
                <div className={styles.optionButton} onClick={() => setEditProfile(prev => !prev)}>
                    Edit Profile
                </div>
               
                <Link className={styles.optionButton} href="/api/auth/logout" target="_top" prefetch={false}>
                    Logout
                </Link>
            </div>
            
        </div>
    )
    }
    return null;
}


