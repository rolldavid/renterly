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
                }, include: {
                    reviews: true
                }
            })

            console.log("created review..............", "reviews: ", prop.reviews)

            if (prop.reviews && prop.reviews.length > 1) {
                console.log("connecting notifications............................")
                const propertyReviewers = prop.reviews.filter(review => review.userId !== userId)
                const receivers = propertyReviewers.map(review => {
                    return {
                        id: review.userId
                    }
                })

                console.log("mapped notifications, now connect them...............")
                const notification = await prisma.notificationActive.create({
                    data: {
                        receivers: {
                            connect: 
                                receivers
                        },
                        notification: {
                            connect: {
                                id: 1
                            }
                        }
                    }
                })
                console.log("connected notifications", notification)
            }
                
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
    
                const review = await prisma.review.update({
                    where: {
                        id: reviewId
                    },
                    data: {
                        comment: comment,
                    },
                    
                 })

                 const prop = await prisma.property.findUnique({
                    where: {
                        id: propertyId
                    },
                    include: {
                        reviews: true
                    }
                })

                if (prop) {
                    const propertyReviewers = prop.reviews.filter(review => review.userId !== userId)
                    const receivers = propertyReviewers.map(review => {
                        return {
                            id: review.userId
                        }
                    })


                    const notification = await prisma.notificationActive.create({
                        data: {
                            receivers: {
                                connect: 
                                    receivers
                            },
                            notification: {
                                connect: {
                                    id: 2
                                }
                            }
                        }
                    })
                }
                    
                 res.status(201).json({message: "success"})
                    
            } catch (err) {
                res.status(401).json({message: "Did not manage to connect"})
        }
        }
    }
}