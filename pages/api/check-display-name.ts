import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
    const { displayName, userId } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {displayName: displayName}
        })
      
        if (!user) {
            res.status(201).json({nameAvailable: true})
        } else if (user.id === userId) {
            res.status(201).json({nameAvailable: true})
        } else {
            res.status(201).json({nameAvailable: false})
        }
    
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
  
   
    
}}