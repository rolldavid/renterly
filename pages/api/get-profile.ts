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
                },
                stars: true
            },
           })

        
        const session = await unstable_getServerSession(req, res, authOptions)
        const accountOwner = session?.user?.email === user?.email ? true : false
        
        if (user) {

            if (!accountOwner) {
            res.status(201).json({user: {
                displayName: user.displayName,
                citystate: user.citystate,
                image: user.image,
            }, reviews: user.reviews,
                stars: user.stars, 
                accountOwner: false})
            } else {
                res.status(201).json({user:{
                    displayName: user.displayName,
                    citystate: user.citystate,
                    image: user.image,
                    userId: user.id
                }, reviews: user.reviews, 
                    stars: user.stars, 
                    accountOwner: true})
            }
        } 

        } catch (err) {
            res.status(401).json({message: "Did not manage to connect"})
        }
   
    }
}