import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.body;

    try {
        const session = await getSession(req, res)

        if (session?.user?.email) {
       
            const user = await prisma.user.findUnique({where: {email: session.user.email}})
           
            if (user) {
                const property = await prisma.property.findUnique({ 
                    where: { slug: slug },
                    include: {
                        reviews: {
                            where: {
                                userId: user.id
                            }, 
                            select: {
                                comment: true,
                                id: true
                            }
                        },
                        stars: {
                            where: {
                                userId: user.id,
                            }
                        }
                    }
                })

                

              
                if (property && property.stars && property.stars.length > 0 && property.reviews.length > 0) {
                    const starNum = property.stars[0].stars
                    const commentStr = property.reviews[0].comment
                    const starId = property.stars[0].id
                    const reviewId = property.reviews[0].id

                    res.status(201).json({ 
                        property: property, 
                        comment: commentStr, 
                        stars: starNum, 
                        editingReview: true, 
                        starId: starId,
                        reviewId: reviewId })
                    return

                } else {
                    const starNum = 0;
                    const commentStr = ""
                    res.status(201).json({ property: property, comment: commentStr, stars: starNum, editingReview: false, reviewId: null })
                    return
                } 
            } 
            
        } else {

        const property = await prisma.property.findUnique({ 
                where: { slug: slug },
            })

            if (property) {
                const starNum = 0;
                const commentStr = ""
                res.status(201).json({ property: property, comment: commentStr, stars: starNum, editingReview: false, reviewId: null })
            } 
            
        }
    } catch (err) {
        throw new Error("Did not manage to connect")
    }

}