import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.body;

    try {
        const property = await prisma.property.findUnique({
            where: {
                slug: slug
            }
        })
    
        if (property) {
            res.status(201).json({property: property})
        }

    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }

}