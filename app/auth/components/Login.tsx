"use client"

import Image from "next/image"
import { SyntheticEvent, useState, Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react"
import { LoginProps } from "../types";
import styles from "./Login.module.css"

const schema = yup
.object({
  email: yup.string().email().required(),
})
.required();

export default function Login({ isLogin, setIsLogin }: {isLogin: boolean, setIsLogin: Dispatch<SetStateAction<boolean>>}) {
    const [value, setValue] = useState("")
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<LoginProps>({
        resolver: yupResolver(schema),
      });

    const handleLogin = async (data: LoginProps) => {
      
        await signIn("email", {
            email: data.email,
            redirect: false,
            callbackUrl: "/auth/confirmation", 
        })
        setSubmitted(true)
    }

    const handleGoogle = async (e: SyntheticEvent) => {
        e.preventDefault();
        await signIn("google")
    }
    return (
        <>
        
        {!submitted && <section className={styles.container}>
            <div className={styles.googleContainer}>
                <div onClick={handleGoogle} className={styles.googleButton}>
                    <Image src={"/google.png"} width={25} height={25} alt="Google icon"/>
                    <p className={styles.googleText}>Login with Google</p>
                </div>
            </div>
            <div className={styles.loginLine}>
                <span className={styles.loginOr}>OR</span>
            </div>
            <div className={styles.emailContainer}>
                <form className={styles.formContainer}>
                    <input 
                        {...register("email")}
                        type="email"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="jane@gmail.com"
                        className={styles.inputContainer}
                    />
                    <div
                        onClick={handleSubmit(handleLogin)}
                        className={styles.emailButton}
                    >
                        Login with Email
                    </div>
                    <div
                        className={styles.emailNote}
                    >
                        
                        <p className={styles.noteText}> <Image src={"/wand.png"} width={15} height={15} alt="magic wand" className={styles.noteImg}/> We'll email you a magic link. No password required.</p>
                    </div>
                </form>
            </div>
            <div className={styles.signupButtonContainer}>
                Need an account? <span className={styles.signupButton} onClick={() => setIsLogin(false)}>Signup</span>
            </div> 
        </section>
        
        }

        {submitted && <section className={styles.checkContainer}>
        <Image src={"/wand.png"} width={30} height={30} alt="magic wand" className={styles.noteImg}/>
            <p className={styles.checkText}>We've emailed you a magic link!</p>
            </section>}
        
        </>
    )
}