import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
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

        const session = await unstable_getServerSession(req, res, authOptions)
        if (!session) {
            res.status(201).json({user: user, session: false})
        } else {
            res.status(201).json({user: user, session: true})
        }

        } catch (err) {
            res.status(401).json({message: "Did not manage to connect"})
        }
    }
   

}