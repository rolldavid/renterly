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

export async function getSession() {
    const res = await fetch("/api/get-session")
    return res.json()

}