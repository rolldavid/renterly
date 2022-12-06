"use client"

import { SyntheticEvent, useState, useEffect } from "react"
import AuthContainer from "../../../auth/components/AuthContainer"

export default function ReviewList({isLoggedIn, slug} : {isLoggedIn: boolean, slug: string}) {
    const [checkedAuth, setCheckedAuth] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [review, setReview] = useState("")

    useEffect(() => {
        const getRev = localStorage.getItem("review")
        const getSlug = localStorage.getItem("slug")

        if (getRev && getSlug === slug) {
            setReview(getRev)
        }
    }, [])

    const handleSubmit = (e: SyntheticEvent) => {
        console.log("handling input....checking if logged in")
        e.preventDefault()
        localStorage.setItem("review", review)
        localStorage.setItem("slug", slug)
        if (isLoggedIn) {
            console.log("sending review to db")
            setSubmitted(true)
            return;
        }
        setCheckedAuth(true)
        return
    }

    return (
        <>
        {!submitted && <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name="review"
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    />
            <button type="submit">
                Post Review
            </button>
            </form>
            
            {checkedAuth && <AuthContainer />}
        </div>}
        {submitted && <div>
            Thanks for submitting!
            </div>}
        </>
    )
}