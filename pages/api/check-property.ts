import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
    const { property } = req.body;
  
    await prisma.property.upsert({
        where: {slug: property.slug}, 
        update: {},
        create: {
            slug: property.slug, 
            stars: {},
            street: property.street,
            unit: property.unit,
            city: property.city,
            state: property.state,
            zipcode: property.zipcode
        }
    })
  
    }
 
    res.status(201).json({message: "success"})
}