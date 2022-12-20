import { Star } from "@prisma/client";

export interface InfiniteReviewProps {
    comment: string;
    displayName: string;
    citystate: string;
    userId: string;
    userImage: string;
    stars: Star[]
    date: Date
}