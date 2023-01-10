"use client"

import Image from "next/image";
import { SyntheticEvent, useState, useEffect } from "react"
import { signOut } from "next-auth/react"
import { ProfileUser } from "app/account/types";
import styles from "./AccountDetails.module.css"
import EditProfile from "./EditProfile";


export default function AccountDetails({user, accountOwner} : { user: ProfileUser, accountOwner: boolean }) {
    const [editProfile, setEditProfile] = useState(false)
    const [city, setCity] = useState("")

    const handleLogout = (e: SyntheticEvent) => {
        signOut({
            callbackUrl: "/"
        });
    }

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
            {editProfile && <EditProfile user={user} setEditProfile={setEditProfile}/>}
            <div className={styles.optionsContainer}>
                <div className={styles.optionButton} onClick={() => setEditProfile(prev => !prev)}>
                    Edit Profile
                </div>
                <div className={styles.optionButton} onClick={handleLogout}>
                    Logout
                </div>
            </div>
            
        </div>
    )
    }
    return null;
}