"use client"

import Image from "next/image";
import { useState, useEffect, useRef, SyntheticEvent } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { createReview, getUserSession, updateReview, deleteReview } from "@/lib/db-utils"
import { ReviewProps, PropertyProps } from "./types";
import AuthContainer from "../../auth/components/AuthContainer"
import styles from "./ReviewInput.module.css"
import Spinner from "@/lib/utils/Spinner";

export default function ReviewInput({ property, editingReview, comment, stars, reviewId, starId} : {property: PropertyProps, editingReview: boolean, comment: string, stars: number, reviewId: number | null, starId: string}) {

    const [showAuth, setShowAuth] = useState(false)
    const [loadDelete, setLoadDelete] = useState(false)
    const [review, setReview] = useState("")
    const [reviewError, setReviewError] = useState<string | null>(null)
    const [rating, setRating] = useState(0);
    const [loaded, setLoaded] = useState(false)
    const [toggleLoaded, setToggleLoaded] = useState(false)
    const [hover, setHover] = useState(0);
    const [starError, setStarError] = useState(false)
    const [loading, setLoading] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    const router = useRouter()


    const [showDelete, setShowDelete] = useState(false)
    const deleteRef = useRef<HTMLInputElement>(null)

    
    const queryClient = useQueryClient()

    const {data: queryResult, status} = useQuery(["session"], () => {
        return getUserSession()
    })

    const { mutateAsync } = useMutation(createReview, {
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews'])
            queryClient.invalidateQueries(['reviewPage'])
            queryClient.invalidateQueries(['stars'])
            router.replace(`/property/${property.slug}`)
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

        const street = property.unit ? `${property.street} ${property.unit}` : property.street 
        const citystate = `${property.city}, ${property.state}`
        const strRating = rating.toString()

        if (!editingReview) {
            localStorage.setItem("review", review)
            localStorage.setItem("slug", property.slug)
            localStorage.setItem("star", strRating)
        }

        if (status === "success" && queryResult.session) {
            setLoading(true)

            const mutateReview = await mutateAsync({
                comment: review,
                stars: rating, 
                userId: queryResult.userId, 
                propertyId: property.id, 
                street, 
                citystate, 
                propertySlug: property.slug,
                reviewId,
                starId,
                updating: editingReview
            })


            if (!editingReview) {
                localStorage.setItem("slug", "")
                localStorage.setItem("review", "")
                localStorage.setItem("star", "")
            }
        
            return
        } 
        setShowAuth(true) 
        return;
    }

    useEffect(() => {
       
        if (!editingReview) {
            const getRev = localStorage.getItem("review")
            const getSlug = localStorage.getItem("slug")
            const getStar = localStorage.getItem("star")
       
            if (getRev && getSlug === property.slug && getStar) {
                const parseStar = parseInt(getStar)
                setReview(getRev)
                setRating(parseStar)
                return
            }
            return
        }


        setReview(comment)
        setRating(stars)
        setToggleLoaded(true)
        
    }, [])

    useEffect(() => {
        if (toggleLoaded) {
            setLoaded(true)
        }
       
    }, [toggleLoaded])


    useEffect(() => {
        if (status === "success" && queryResult.userId) {
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

    const handleDeleteClose = (e: MouseEvent) => {
        e.preventDefault()
        if (e.target instanceof Element) {
            if (deleteRef.current?.classList[0] === e.target.classList[0]) {
                setShowDelete(false)
            }
        }
    }

    useEffect(() => {
        const element = deleteRef.current
        if (showDelete && element) {
            element.addEventListener("click", e => handleDeleteClose(e))
        }
     
        return () => {
            if (element) {
            element.removeEventListener("click", e => handleDeleteClose(e))
            }
        }
    }, [showDelete])

    const handleDelete = async (e: SyntheticEvent, reviewId: number | null) => {
        e.preventDefault()
        setLoadDelete(true)
        if (reviewId && queryResult.userId) {
            const res = await deleteReview(reviewId, queryResult.userId)
            if (res.status === "success") {
                setShowDelete(false)
                localStorage.setItem("slug", "")
                localStorage.setItem("review", "")
                localStorage.setItem("star", "")
                queryClient.invalidateQueries(['reviews'])
                queryClient.invalidateQueries(['reviewPage'])
                queryClient.invalidateQueries(['stars'])
                router.replace(`/property/${property.slug}`)
                setLoadDelete(false)
                return;
            }
        }
        setLoadDelete(false)
        return
    }

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
                                        src={"/images/review/fullStar.png"} 
                                        width={23} height={23} 
                                        alt="rating star" 
                                        className={styles.starItem}
                                        onMouseEnter={() => setHover(starIndex)}
                                        onMouseLeave={() => setHover(rating)}
                                        onClick={() => setRating(starIndex)}
                                    /> 
                                    : <Image 
                                        src={"/images/review/greyStar.png"} 
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
                        <p className={styles.presubmitTitle}> <Image src={"/images/icons/lock.png"} width={15} height={15} alt="magic wand" className={styles.presubmitImg}/>Anonymous by Default </p>
                        <p className={styles.presubmitText}>We'll create an anonymous profile for you. Update your information any time in your account settings.</p>
                    </div>
                </div>
                <div className={styles.submitContainer}>
                    
                    {!editingReview && <button type="submit" className={styles.submitButton}>
                        Post Review
                    </button>}
                    {editingReview && 
                        <div className={styles.editButtonContainer}>
                            <button type="submit" className={styles.submitButton}>
                                Update Review
                            </button>
                            <div onClick={() => setShowDelete(true)} className={styles.deleteButton}>
                                Delete
                            </div>
                        </div>
                    }
                </div>
                
            </form>
            
            {showAuth &&
                <div className={styles.authModuleContainer} ref={ref}>
                    <div className={styles.authModule}>
                        <AuthContainer fromReview={true}/>
                    </div>
                </div>
            }
             {showDelete &&
                <div className={styles.deleteModuleContainer} ref={deleteRef}>
                    <div className={styles.deleteModule}>
                        <p>Are you sure you want to delete your review?</p>
                        <div className={styles.confirmDelete}>
                            <div className={styles.confirmButton} onClick={(e) => handleDelete(e, reviewId)}>
                                {!loadDelete && <p className={styles.deleteText}>Yes, delete it</p>}
                                {loadDelete && <p className={styles.deleteText}>Deleting...</p>}
                            </div>
                            <div className={styles.deleteButton} onClick={() => setShowDelete(false)}>
                                No, go back
                            </div>
                        </div>
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