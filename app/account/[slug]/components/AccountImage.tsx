"use client"

import { SyntheticEvent, useState } from "react"
import Image from "next/image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProfileUser } from "app/account/types";
import { updateProfileImg } from "@/lib/db-utils"
import styles from "./AccountImage.module.css"


export default function AccountImage ({ user, session} : { user: ProfileUser, session: boolean }) {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState("rotateIcon")

    const updateImg = async (e: SyntheticEvent) => {
        setLoading("rotateIconSpin")
        e.preventDefault();
        const randProf = Math.floor(Math.random() * 15).toString()
        if (user.userId) {
            await mutateAsync({profileImage: randProf, userId: user.userId})
        setTimeout(() => {
            setLoading("rotateIcon")
        }, 500)
        }
        return;
    }

    const { mutateAsync } = useMutation(updateProfileImg, {
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
            queryClient.invalidateQueries(['session'])
          },
    });

    if (!session) {
        return (
            <div className={styles.container}>
                <Image 
                    src={`/images/profile/${user.image}.png`} 
                    width={100} 
                    height={100} 
                    alt="profile picture"
                />
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image 
                    src={`/images/profile/${user.image}.png`} 
                    width={100} 
                    height={100} 
                    alt="profile" 
                    className={styles.profileImage}
                    onClick={updateImg}
                />
                
            </div>
        </div>
    )
}

{/* <Image 
                    src={`/images/icons/rotate.png`} 
                    width={35} 
                    height={35} 
                    alt="profile" 
                    className={styles[`${loading}`]}
                    onClick={updateImg}
                /> */}