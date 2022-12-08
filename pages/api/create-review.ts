import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {review, stars, userId, propertyId} = req.body;
        const displayName = "Anon"
       
        try {
            const prop = await prisma.property.update({
               where: {
                id: propertyId
               },
               data: {
                reviews: {
                    create: {
                        displayName,
                        stars,
                        comment: review,
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                }
               }
            })
            res.status(201).json({message: "success"})
            
        } catch (err) {
            res.status(401).json({message: "Did not manage to connect"})
        }
    }
}