import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {comment, stars, userId, propertyId, street, citystate, propertySlug, reviewId, starId, updating} = req.body;

        const starInt = parseInt(stars)

        if (!updating) {
            try {
                const prop = await prisma.property.update({
                where: {
                    id: propertyId
                },
                data: {
                    reviews: {
                        create: {
                            comment: comment,
                            street,
                            citystate,
                            propertySlug,
                            user: {
                                connect: {
                                    id: userId
                                }
                            },
                            stars: {
                                create: {
                                    stars: starInt,
                                    user: {
                                        connect: {
                                            id: userId
                                        }
                                    },
                                    property: {
                                        connect: {
                                            id: propertyId
                                        }
                                    }
                                }
                            }
                        },
                    }
                }})

                res.status(201).json({message: "success"})
                
                } catch (err) {
                throw new Error("Did not manage to connect")
            }
        } else {
            try {
                const star = await prisma.star.update({
                    where: {
                        id: starId
                    },
                    data: {
                        stars: stars
                    }
                })
    
                const prop = await prisma.review.update({
                    where: {
                        id: reviewId
                    },
                    data: {
                        comment: comment,
                    }
                 })

                 
                 res.status(201).json({message: "success"})
                    
            } catch (err) {
                res.status(401).json({message: "Did not manage to connect"})
        }
        }
    }
}