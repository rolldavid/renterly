import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { propertyId } = req.body;
    
    try {
        const session = await unstable_getServerSession(req, res, authOptions)

        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: {email: session.user.email},
                include: {
                    bookmarks: {
                        where: {
                            propertyId: propertyId
                        }
                    }
                }
            
            })
          
            if (user?.bookmarks && user.bookmarks.length > 0) {
                res.status(201).json({isBookmarked: true})
                return
            } else {
                res.status(201).json({isBookmarked: false})
                return
            }
        }
        res.status(401).json({status: "unauthorized"})
    } catch (err) {
        throw new Error("Did not manage to connect")
    }

}