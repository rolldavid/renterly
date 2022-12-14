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
            },
            include: {
                reviews: {
                    orderBy: {
                        createdAt: "desc",
                    },
                }
            },
           })
        

        const session = await unstable_getServerSession(req, res, authOptions)
        if (!session && user) {
            res.status(201).json({user: {
                displayName: user.displayName,
                citystate: user.citystate,
                image: user.image,
            }, reviews: user.reviews, 
                session: false})
        } else if (user) {
            res.status(201).json({user:{
                displayName: user.displayName,
                citystate: user.citystate,
                image: user.image,
                userId: user.id
            }, reviews: user.reviews, 
                session: true})
        }

        } catch (err) {
            res.status(401).json({message: "Did not manage to connect"})
        }
    }
   

}