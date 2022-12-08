// READ

export async function getUser(slug: string) {
    const res = await fetch("/api/get-user", {
        method: "POST",
        body: JSON.stringify({
            userId: slug
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

export async function getUserId() {
    const res = await fetch("/api/get-user-id")
    const data = await res.json()
    return data;
}

// UPDATE

export async function updateUser(first: string, last: string, id: string) {
    const res = await fetch("/api/update-user", {
        method: "POST",
        body: JSON.stringify({
            first,
            last,
            id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}


// CREATE

export async function createReview(review: string, stars: number, userId: string, propertyId: string) {
    console.log("incoming....", review, stars, userId)
    const res = await fetch("/api/create-review", {
        method: "POST",
        body: JSON.stringify({
            review,
            stars,
            userId,
            propertyId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}


// DELETE
