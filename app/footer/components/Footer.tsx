import Link from "next/link"
import Image from "next/image"
import styles from "./Footer.module.css" 

export default function Footer(){
    return (
    
        <section className={styles.container}>
            <div className={styles.logoContainer}>
                <h1 className={styles.logo}>renterly</h1>
            </div>
            <div className={styles.footerContent}>  
                {/* <Link href="/" className={styles.footerItem}>About Us</Link> */}
                <Link href={"/policies/terms"} className={styles.footerItem}>Terms & Conditions</Link>
                <Link href={"/policies/privacy"} className={styles.footerItem}>Privacy Policy</Link>
            </div>
            <div className={styles.socialLinks}>
                <Link href="https://twitter.com/_renterly" className={styles.footerSocialImg}>
                    <Image 
                        src={"/images/icons/twitter.png"} 
                        width={20} 
                        height={20} 
                        alt="Twitter icon"
                        className={styles.socialImg}
                    />
                </Link>
                
            </div>
                
        
            
        </section>
        
    
    )
}

