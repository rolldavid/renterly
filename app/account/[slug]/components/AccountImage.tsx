"use client"

import { SyntheticEvent, useState } from "react"
import Image from "next/image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { User } from "@prisma/client"
import { updateProfileImg } from "@/lib/db-utils"
import styles from "./AccountImage.module.css"


export default function AccountImage ({ user, session, } : { user: User, session: boolean }) {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState("rotateIcon")
    const [editButton, setEditButton] = useState("change")
    const [expand, setExpand] = useState(false)


    const updateImg = async (e: SyntheticEvent, index: number) => {
        e.preventDefault();
        setEditButton("rotate")
        setLoading("rotateIconSpin")
        setExpand(false)
        const prof = index.toString()
        await mutateAsync({profileImage: prof, userId: user.id})
        setTimeout(() => {
            setLoading("rotateIcon")
            setEditButton("change")
        }, 750)
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
                    onClick={() => setExpand(prev => !prev)}
                />
                <Image 
                    src={`/images/icons/${editButton}.png`} 
                    width={35} 
                    height={35} 
                    alt="profile" 
                    className={styles[`${loading}`]}
                    onClick={() => setExpand(prev => !prev)}
                />
            </div>
           
            {expand && <div className={styles.expandContainer}>
                {
                    [...Array(15)].map((item, index) => {
                        return (
                            <Image 
                                src={`/images/profile/${index}.png`} 
                                width={50} 
                                height={50} 
                                alt="profile" 
                                className={styles.expandItem}
                                onClick={(e) => updateImg(e, index)}
                            />
                        )
                    })
                }
                
            </div>}
            
        </div>
    )
}