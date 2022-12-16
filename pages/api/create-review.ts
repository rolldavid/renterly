import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {review, stars, userId, propertyId, street, citystate, propertySlug} = req.body;

        try {
            const prop = await prisma.property.update({
               where: {
                id: propertyId
               },
               data: {
                reviews: {
                    create: {
                        stars,
                        comment: review,
                        street,
                        citystate,
                        propertySlug,
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                },
                stars: {
                    push: stars
                }
               }
            })

            res.status(201).json({message: "success"})
            } catch (err) {
            throw new Error("Did not manage to connect")
        }
    }
}