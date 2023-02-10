import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { propertyId } = req.body;

    try {
        const property = await prisma.property.findUnique({
            where: {
                id: propertyId
            },
            include: {
                stars: true
            }
        })

        if (property?.stars) {
                res.status(201).json({stars: property.stars})
            return
        }
        res.status(201).json({stars: property?.stars})
    } catch (err) {
        throw new Error("Did not manage to connect")
    }

}
