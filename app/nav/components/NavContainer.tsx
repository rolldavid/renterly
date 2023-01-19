"use client"

import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "@/lib/db-utils"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import NavLinks from "./NavLinks"
import NotificationIcon from "app/notifications/components/NotificationIcon";
import styles from "./NavContainer.module.css"
import burger from "../assets/burger-dark.png"
import  NavModal from "./NavModal"


export default function NavContainer() {
    const [showModal, setShowModal] = useState(false);
    const [width, setWidth] = useState(0)

    const {data, status} = useQuery(["session"], () => {
        return getUserSession()
    })

    useEffect(() => {
        const updateWindowDimensions = () => {
          const newWidth = window.innerWidth;
          setWidth(newWidth);
        };
    
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions) 
      }, []);

    useEffect(() => {
        if (width >= 768) {
            setShowModal(false)
        }
    }, [width])    

    if (status === "loading") {
        return (
            <>
            <div className={styles.desktop}>
                <NavLinks status={status} userId={""} session={false} />
            </div>
            <div className={styles.mobile}>
                <Link href={"/"} className={styles.logoContainer}>
                    <div className={styles.logo}>renterly</div>
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
            
            {showModal && <NavModal status={status} userId={""} session={false} setShowModal={setShowModal}/>}
        </>
        )
    }

    if (status === "success" && data.userId && data.session) {
        return (
            <>
            <div className={styles.desktop}>
                <NavLinks status={status} userId={data.userId} session={data.session} />
            </div>
            <div className={styles.mobile}>
                <Link href={"/"} className={styles.logoContainer}>
                    <div className={styles.logo}>renterly</div>
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
            {showModal && <NavModal status={status} userId={data.userId} session={data.session} setShowModal={setShowModal}/>}
        </>
        )
    }

    if (status === "success") {
        return (
            <>
            <div className={styles.desktop}>
                <NavLinks status={status} userId={undefined} session={undefined} />
            </div>
            <div className={styles.mobile}>
                <Link href={"/"} className={styles.logoContainer}>
                    <div className={styles.logo}>renterly</div>
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
            {showModal && <NavModal status={status} userId={undefined} session={undefined} setShowModal={setShowModal}/>}
        </>
        )
    }


    return null
}