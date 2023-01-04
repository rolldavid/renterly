export interface PostList {
    id: number
    attributes: {
        createdAt: string
        updatedAt: string
        publishedAt: string
        Title: string
        Content: string
        Date: string
        Author: string
        Description: string
        Slug: string
    }
}

export interface PostItem {
    createdAt: string
    updatedAt: string
    publishedAt: string
    Title: string
    Content: string
    Date: string
    Author: string
    Description: string
    Slug: string
}

export interface PostProps {
    params: {
        slug: string
    }
}