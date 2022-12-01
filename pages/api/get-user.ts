import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { userId } = req.body;

        try {
           const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
           })
           res.status(201).json({user: user})
        } catch (err) {
            res.status(401).json({message: "Did not manage to connect"})
        }
    }
   

}