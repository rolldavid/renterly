"use client"

import Image from "next/image";
import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { createReview } from "@/lib/db-utils"
import { ReviewProps } from "./types";
import AuthContainer from "../../../auth/components/AuthContainer"
import styles from "./ReviewInput.module.css"


const schema = yup
.object({
  review: yup.string().required(),
})
.required();

export default function ReviewList({isLoggedIn, slug, userId, propertyId} : {isLoggedIn: boolean, slug: string, userId: string, propertyId: string}) {
    const [checkedAuth, setCheckedAuth] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [showAuth, setShowAuth] = useState(false)
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [starError, setStarError] = useState(false)

    const ref = useRef<HTMLInputElement>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ReviewProps>({
        resolver: yupResolver(schema),
      });


    const handlePost = async (data: ReviewProps) => {
        
        if (rating === 0) {
            setStarError(true)
            return
        }
        const strRating = rating.toString()
        localStorage.setItem("review", review)
        localStorage.setItem("slug", slug)
        localStorage.setItem("star", strRating)
        if (isLoggedIn) {
            createReview(data.review, rating, userId, propertyId)
            setSubmitted(true)
            return;
        }
        setShowAuth(true)
        setCheckedAuth(true)
        return;
    }

    useEffect(() => {
        const getRev = localStorage.getItem("review")
        const getSlug = localStorage.getItem("slug")
        const getStar = localStorage.getItem("star")
       
        if (getRev && getSlug === slug && getStar) {
            const parseStar = parseInt(getStar)
            setReview(getRev)
            setRating(parseStar)
        }
    }, [])

    useEffect(() => {
        setShowAuth(false)
    }, [isLoggedIn])

    const handleModalClose = (e: MouseEvent) => {
        e.preventDefault()
        if (e.target instanceof Element) {
            if (ref.current?.classList[0] === e.target.classList[0]) {
                setShowAuth(false)
            }
        }
    }

    useEffect(() => {
        const element = ref.current
        if (showAuth && element) {
            element.addEventListener("click", e => handleModalClose(e))
        }
     
        return () => {
            if (element) {
            element.removeEventListener("click", e => handleModalClose(e))
            }
           
        }
    }, [showAuth])

  
    return (
        <>
        {!submitted && <div className={styles.inputContainer}>
            <form onSubmit={handleSubmit(handlePost)} className={styles.formContainer}>
                <div className={styles.reviewContainer}>
                    <div className={styles.starContainer}>
                        <div className={styles.starImgContainer}>
                        {[...Array(5)].map((star, index) => {        
                            const starIndex = index + 1;
                            return (         
                            <span 
                                className={styles.starMapItem}
                                key={index}
                            >
                                {index < (hover || rating) ? 
                                    <Image 
                                        src={"/fullStar.png"} 
                                        width={23} height={23} 
                                        alt="rating star" 
                                        className={styles.starItem}
                                        onMouseEnter={() => setHover(starIndex)}
                                        onMouseLeave={() => setHover(rating)}
                                        onClick={() => setRating(starIndex)}
                                    /> 
                                    : <Image 
                                        src={"/emptyStar.png"} 
                                        width={23} 
                                        height={23} 
                                        alt="rating star" 
                                        className={styles.starItem}
                                        onMouseEnter={() => setHover(starIndex)}
                                        onMouseLeave={() => setHover(rating)}
                                        onClick={() => setRating(starIndex)}
                                    />

                                }
                            </span>        
                            );
                        })}
                       
                        </div>
                        <div className={styles.starTextContainer}>
                            <p className={styles.starText}>Select rating</p>
                        </div>
                    </div>
                    <textarea
                        {...register("review")}
                        className={styles.inputField}
                        rows={10}
                        placeholder="The landlord withheld almost half of my deposit, claiming it was to cover cleaning, but I left the apartment cleaner than how I found it. Unfortunately I didn’t have the time or money to pursue legal action against them and recoup my lost money. I also noticed water damage around my bedroom window after I had moved in, so if you’re considering this place, ask them to weatherize the window and maybe test for mold before moving in."
                        value={review}
                        onChange={e => setReview(e.target.value)}
                    />
                    {starError && <p className={styles.errorMessage}>Please select a star rating to post your review.</p>}
{/*                     <p className={styles.errorMessage}>{errors.review?.message ? "Please enter a review." : null}</p>
 */}                    
                </div> 
                <div className={styles.submitContainer}>
                    <button type="submit" className={styles.submitButton}>
                        Post Review
                    </button>
                </div>
                
            </form>
            
            {checkedAuth && showAuth && !submitted &&
                <div className={styles.authModuleContainer} ref={ref}>
                    <div className={styles.authModule}>
                        <AuthContainer />
                    </div>
                </div>
            }
        </div>}
        {submitted && <div>
            Thanks for submitting!
            </div>}
        </>
    )
}