import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { image, userId } = req.body;
        
        try {
            const user = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    image: image
                },
            })
            if (user) {
                res.status(201).json({message: "success"})
            }
                
            
        } catch (err) {
            res.status(401).json({message: "Did not manage to connect"})
    }}
}