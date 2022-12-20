import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { Star } from "@prisma/client";

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
        res.status(201).json({stars: property?.stars})
    } catch (err) {
        throw new Error("Did not manage to connect")
    }

}
