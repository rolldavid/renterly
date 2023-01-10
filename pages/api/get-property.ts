import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { Star } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { propertyId } = req.body;

    try {
        const propertyReviews = await prisma.property.findUnique({
            where: {
                id: propertyId
            },
            include: {
                reviews: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        user: {
                            select: {
                                displayName: true,
                                citystate: true,
                                image: true,
                                id: true,
                            }
                        },
                    }
                }, 
                stars: true
            },
        })


        const users =  propertyReviews?.reviews.map((review, index) => {
            const chosenStar = propertyReviews.stars.filter(obj => {
                return obj.userId === review.userId
            })

            const parseStar = chosenStar[0].stars

            return {
                displayName: review.user.displayName,
                citystate: review.user.citystate,
                image: review.user.image,
                userId: review.user.id,
                stars: parseStar
            }
        })

        const session = await unstable_getServerSession(req, res, authOptions)

        if (session?.user?.email && propertyReviews) {
            const user = await prisma.user.findFirst({
                where: 
                    { 
                        email: session.user.email,
                        reviews: {
                            some: {
                                propertyId: propertyId
                            }
                        }
                    }
            })

            if (user) {
                res.status(201).json({reviews: propertyReviews.reviews, users, postedReview: true})
                return
            } else {
                res.status(201).json({reviews: propertyReviews.reviews, users, postedReview: false})
                return
            }
            
        } else {
            res.status(201).json({reviews: propertyReviews?.reviews, users, postedReview: false})
        }
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}