"use client"

import { useEffect, useState } from "react"
import { AuthProps } from "../types"
import NavLinks from "./NavLinks"
import styles from "./NavModal.module.css"

export default function NavModal({status, userId, session, setShowModal}: AuthProps) {
    const [isMounted, setIsMounted] = useState(false)
    const handleModalClose = () => {
        if (setShowModal) {
            setShowModal(false)
        }
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted) {
            window.addEventListener("click", handleModalClose)
        }
        return () => {
            window.removeEventListener("click", handleModalClose)
        }
    }, [isMounted])

    return (
        <div className={styles.container}>
           <NavLinks status={status} userId={userId} session={session}/>
        </div>
    )
}