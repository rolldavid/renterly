import { Star } from "@prisma/client";

export interface PropertyParams {
    propertyId: string
}

export interface ReviewProps {
    stars: number;
    review: string;
}

export interface reviewProps {
    comment: string
    stars: number
    userId: number
    propertyId: string
    street: string
    citystate: string
    propertySlug: string
    reviewId?: number | null
    starId?: string
    updating: boolean
}

export interface UserList {
    displayName: string;
    citystate: string;
    image: string;
    userId: number;
    stars: number;
}

export interface UpdateProps {
    comment: string;
    stars: number;
    propertyId: string;
    userId: number;
    reviewId: number;
    starId: string;
}

// passing property details to review
export interface PropertyProps {
    id: string;
    unit: string | null;
    street: string;
    city: string;
    state: string;
    slug: string;
}

// passing stars to individual reviews
export interface StarProps {
    userId: number;
    stars: number;
}

// mutating bookmark
export interface BookmarkProps {
    propertyId: string
    type: "add" | "remove"
}