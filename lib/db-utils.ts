import { reviewProps, UpdateProps } from "app/review/components/types";
import { ProfileProps } from "app/account/types";


// READ

export async function getNotifications() {
    const res = await fetch("/api/get-notifications")
    const data = await res.json()
    return data
}

export async function getProfile(userId: number) {
    const res = await fetch("/api/get-profile", {
        method: "POST",
        body: JSON.stringify({
            userId: userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}

export async function checkDisplayName(displayName: string, userId: number) {
    const res = await fetch("/api/check-display-name", {
        method: "POST",
        body: JSON.stringify({
            displayName,
            userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}

export async function checkCity(cityName: string) {
    const res = await fetch("/api/check-city", {
        method: "POST",
        body: JSON.stringify({
            cityName,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}

export async function getProperty(propertyId: string) {
    const res = await fetch("/api/get-property", {
        cache: 'no-store',
        method: "POST",
        body: JSON.stringify({
            propertyId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }, )
    const data = await res.json()
    return data;
}

export async function getStars(propertyId: string) {
    const res = await fetch("/api/get-stars", {
        cache: 'no-store',
        method: "POST",
        body: JSON.stringify({
            propertyId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}


export async function getReviewPage(slug: string) {
    const res = await fetch("/api/get-review-page", {
        cache: 'no-store',
        method: "POST",
        body: JSON.stringify({
            slug
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}

export async function getSession() {
    const res = await fetch("/api/get-session")
    return res.json()
}

export async function getUserSession() {
    const res = await fetch("/api/get-user-session")
    const data = await res.json()
    return data;
}

// UPDATE

export async function updateProfile({displayName, city, state, image, userId}: ProfileProps) {
    const res = await fetch("/api/update-profile", {
        method: "POST",
        body: JSON.stringify({
            displayName,
            city,
            state,
            image,
            userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}

export async function updateReview({comment, stars, propertyId, userId, starId}: UpdateProps) {
    const res = await fetch("/api/update-review", {
        method: "POST",
        body: JSON.stringify({
            comment,
            stars,
            propertyId,
            userId,
            starId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}


export async function updateNotifications() {
    const res = await fetch("/api/update-notifications")
    const data = await res.json();
    return data;
}

// CREATE

export async function createReview({comment, stars, userId, propertyId, street, citystate, propertySlug, starId, reviewId, updating}: reviewProps) {
    const res = await fetch("/api/create-review", {
        method: "POST",
        body: JSON.stringify({
            comment,
            stars,
            userId,
            propertyId,
            street,
            citystate,
            propertySlug,
            starId,
            reviewId,
            updating
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}


// DELETE
