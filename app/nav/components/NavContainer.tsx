"use client"

import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import Link from "next/link"

import NavLinks from "./NavLinks"
import styles from "./NavContainer.module.css"
import burger from "../assets/burger-dark.png"
import  NavModal from "./NavModal"

export default function NavContainer() {
    const [session, setSession] = useState<string>()
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getSession = async () => {
            const res = await fetch("/api/get-session")
            const data = await res.json();
            setSession(data.email)
            return;
        }
        getSession()
    }, [])

    return (
        <>
            <div className={styles.desktop}>
                <NavLinks isLoggedIn={session}/>
            </div>
            <div className={styles.mobile}>
                <Link href={"/"} className={styles.logoContainer}>
                    <div className={styles.logo}>Renterly</div>
                </Link>
               
                <Image 
                    src={burger} 
                    alt={"Main menu hamburger"} 
                    className={styles.burger}
                    width={25} 
                    height={25}
                    aria-label={`Main Menu`}
                    title={`Main Menu`}
                    onClick={() => setShowModal(true)}
                />
            </div>
            {showModal && <NavModal isLoggedIn={session} setShowModal={setShowModal}/>}
        </>
    )
}