import { revProps } from "app/review/components/types";
import { ProfileProps } from "app/account/types";

// READ

export async function getProfile(userId: string) {
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

export async function checkDisplayName(displayName: string, userId: string) {
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

export async function getProperty(propertyId: string) {
    const res = await fetch("/api/get-property", {
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


// CREATE

export async function createReview({rev, rate, userId, propId, street, citystate, propertySlug}: revProps) {
    const res = await fetch("/api/create-review", {
        method: "POST",
        body: JSON.stringify({
            review: rev,
            stars: rate,
            userId: userId,
            propertyId: propId,
            street: street,
            citystate: citystate,
            propertySlug
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}


// DELETE
