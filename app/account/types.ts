import { Star } from "@prisma/client";

export interface EditProfileProps {
    displayName: string;
    city: string;
    state: string;
}

export interface ProfileProps {
    displayName: string;
    city: string;
    state: string;
    image: string;
    userId: number;
}

export interface ProfileUser {
    displayName: string;
    citystate: string;
    image: string; 
    userId?: number
}


export interface RevList {
    id: string;
    createdAt: Date;
    userId: number;
    propertyId: string;
    comment: string;
    street: string;
    citystate: string;
    propertySlug: string;
    flagged: boolean;
    edited: boolean;
    editedAt: Date | null;
    landlordRating: string | null;
    safetyRating: string | null;
    moveoutRating: string | null;
    votes: number | null;
    responseId: string | null;
    stars: Star[]
}

export interface MappedRevList {
    review: RevList;
    stars: Star;
}

export interface StarProps {
    stars: Star[]
    reviewId: number
}