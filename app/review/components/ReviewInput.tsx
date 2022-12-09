"use client"

import Image from "next/image";
import { useState, useEffect, useRef } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Property } from "@prisma/client";
import { useRouter } from "next/navigation";

import { createReview, getUserId } from "@/lib/db-utils"
import { ReviewProps } from "./types";
import AuthContainer from "../../auth/components/AuthContainer"
import styles from "./ReviewInput.module.css"
import Spinner from "@/lib/utils/Spinner";
import { string } from "yup";

export default function ReviewList({ property} : {property: Property}) {
    const [checkedAuth, setCheckedAuth] = useState(false)
    const [showAuth, setShowAuth] = useState(false)
    const [review, setReview] = useState("")
    const [reviewError, setReviewError] = useState<string | null>(null)
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [starError, setStarError] = useState(false)
    const [loading, setLoading] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const queryClient = useQueryClient()
    const {data: queryResult, status} = useQuery(["session"], () => {
        return getUserId()
    })

    const { mutateAsync } = useMutation(createReview, {
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews'])
          },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ReviewProps>();

    const handlePost = async (data: ReviewProps) => {
        
        if (rating === 0) {
            setStarError(true)
            return;
        } else {
            setStarError(false)
        }

        if (review.length < 10) {
            setReviewError("starting")
            return;

        } else if (review.length < 50) {
            setReviewError("min")
            return;
        } else {
            setReviewError(null)
        }

        const strRating = rating.toString()
        localStorage.setItem("review", review)
        localStorage.setItem("slug", property.slug)
        localStorage.setItem("star", strRating)
        if (status === "success" && queryResult.user) {
            setLoading(true)
            await mutateAsync({rev: review, rate: rating, userId: queryResult.user.id, propId: property.id})
            localStorage.setItem("slug", "")
            localStorage.setItem("review", "")
            localStorage.setItem("star", "")
            router.push(`/property/${property.slug}`)
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
       
        if (getRev && getSlug === property.slug && getStar) {
            const parseStar = parseInt(getStar)
            setReview(getRev)
            setRating(parseStar)
        }
    }, [])

    useEffect(() => {
        if (status === "success" && queryResult.id) {
            setShowAuth(false)
        }
    }, [queryResult])

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
       
        {!loading && <div className={styles.inputContainer}>
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
                                        src={"/greyStar.png"} 
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
                    {reviewError === "starting" && <p className={styles.errorMessage}>{`Looks like you're just getting started...`}</p>}
                    {reviewError === "min" && <p className={styles.errorMessage}>{`Please make your review at least 50 characters.`}</p>}
                
                </div> 
                <div className={styles.preSubmitContainer}>
                    <div className={styles.presubmitTip}>
                        <p className={styles.presubmitTitle}> <Image src={"/images/lock.png"} width={15} height={15} alt="magic wand" className={styles.presubmitImg}/>Anonymous by Default </p>
                        <p className={styles.presubmitText}>We'll create an anonymous profile for you. Update your information any time in your account settings.</p>
                    </div>
                </div>
                <div className={styles.submitContainer}>
                    
                    <button type="submit" className={styles.submitButton}>
                        Post Review
                    </button>
                </div>
                
            </form>
            
            {checkedAuth && showAuth &&
                <div className={styles.authModuleContainer} ref={ref}>
                    <div className={styles.authModule}>
                        <AuthContainer />
                    </div>
                </div>
            }
        </div>}
        {loading && <div className={styles.inputContainer}>
            <Spinner />
        </div>}
        </>
    )
}