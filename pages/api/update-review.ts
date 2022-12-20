import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {propertyId, comment, stars, userId, reviewId, starId} = req.body;
        
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
    }}
}