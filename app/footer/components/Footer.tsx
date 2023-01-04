import Link from "next/link"
import Image from "next/image"
import styles from "./Footer.module.css" 

export default function Footer(){
    return (
        <section className={styles.container}>
            <div className={styles.footerLogo}>
                <h1 className={styles.logo}>renterly</h1>
            </div>
            <div className={styles.footerContent}>
                <div className={styles.projectLinks}>
                    <Link href="/" className={styles.footerItem}>About Us</Link>
                    <Link href="/blog" className={styles.footerItem}>Blog</Link>
                    <Link href="/" className={styles.footerItem}>Resources</Link>
                    <Link href="/" className={styles.footerItem}>Contribute</Link>
                </div>
                <div className={styles.buildLinks}>
                    <Link href="/" className={styles.footerItem}>Terms of Service</Link>
                    <Link href="/" className={styles.footerItem}>Privacy Policy</Link>
                    <Link href="/" className={styles.footerItem}>Report a Bug</Link>
                </div>
                <div className={styles.socialLinks}>
                    <Link href="/" className={styles.footerSocialImg}>
                        <Image 
                            src={"/images/icons/twitter.png"} 
                            width={25} 
                            height={25} 
                            alt="Twitter icon"
                            className={styles.socialImg}
                        />
                    </Link>
                    <Link href="/" className={styles.footerSocialImg}>
                        <Image 
                            src={"/images/icons/instagram.png"} 
                            width={25} 
                            height={25} 
                            alt="Twitter icon"
                            className={styles.socialImg}
                        />
                    </Link>
                    <Link href="/" className={styles.footerSocialImg}>
                        <Image 
                            src={"/images/icons/tiktok.png"} 
                            width={25} 
                            height={25} 
                            alt="Twitter icon"
                            className={styles.socialImg}
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}