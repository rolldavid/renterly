import Link from "next/link";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]";
import ToggleTheme from "./ToggleTheme"
import styles from "./NavLinks.module.css"
import AuthButton from "./AuthButton";

export default function NavLinks({isLoggedIn}: {isLoggedIn: string | undefined}) {
    
    return (
        <nav className={styles.container}>
            <nav className={styles.linkContainer}>
                <Link href={"/"}>
                    <h1 className={styles.logo}>R</h1>
                </Link>
            </nav>
            <div className={styles.accountContainer}>
                <div className={styles.toggle}>
                    <ToggleTheme />
                </div>
                <div className={styles.authContainer}>
                    <AuthButton isSignedIn={isLoggedIn ? true : false}/>
                </div>
            </div>
        </nav>
    )
}