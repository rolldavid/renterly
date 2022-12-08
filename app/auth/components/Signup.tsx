"use client"

import Image from "next/image"
import { SyntheticEvent, useState, Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react"
import styles from "./Signup.module.css"
import { SignupProps } from "../types";

const schema = yup
.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required()
})
.required();

export default function Signup({ isLogin, setIsLogin }: {isLogin: boolean, setIsLogin: Dispatch<SetStateAction<boolean>>}) {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<SignupProps>({
        resolver: yupResolver(schema),
      });

    const handleSignup = async (data: SignupProps) => {
        await signIn("email", {
            email: data.email,
            redirect: false,
            callbackUrl: "/auth/confirmation", 
        })
        localStorage.setItem("firstName", data.firstName)
        localStorage.setItem("lastName", data.lastName)
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
                    <p className={styles.googleText}>Signup with Google</p>
                </div>
            </div>
            <div className={styles.signupLine}>
                <span className={styles.signupOr}>OR</span>
            </div>
            <div className={styles.emailContainer}>
                <form className={styles.formContainer}>
                    <div className={styles.nameContainer}>
                        <input 
                            {...register("firstName")}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className={styles.nameInputFirst}
                        />
                        <input 
                            {...register("lastName")}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className={styles.nameInputLast}
                        />
                    </div>
                        <input 
                            {...register("email")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className={styles.inputContainer}
                        />
                    <div
                        onClick={handleSubmit(handleSignup)}
                        className={styles.emailButton}
                    >
                        Signup with Email
                    </div>
                    <div
                        className={styles.emailNote}
                    >
                        
                        <p className={styles.noteText}> <Image src={"/wand.png"} width={15} height={15} alt="magic wand" className={styles.noteImg}/> We'll email you a magic link. No password required.</p>
                    </div>
                </form>
            </div>
            <div className={styles.loginButtonContainer}>
                Have an account? <span className={styles.loginButton} onClick={() => setIsLogin(true)}>Login</span>
            </div> 
            
        </section>}
        {submitted && <section className={styles.checkContainer}>
        <Image src={"/wand.png"} width={30} height={30} alt="magic wand" className={styles.noteImg}/>
            <p className={styles.checkText}>We've emailed you a magic link!</p>
            </section>}
        </>
    )
}