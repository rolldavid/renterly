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
                }
            },
           
        })
    
        if (propertyReviews) {
            res.status(201).json({reviews: propertyReviews.reviews})
        }

    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }

}