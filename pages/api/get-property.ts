import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

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
                                id: true
                            }
                        }
                    }
                }
            },
           
        })

        const users =  propertyReviews?.reviews.map(review => {
            return {
                displayName: review.user.displayName,
                citystate: review.user.citystate,
                image: review.user.image,
                userId: review.user.id
            }
        })
    
        if (propertyReviews) {
            res.status(201).json({reviews: propertyReviews.reviews, users})
        }

    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }
}