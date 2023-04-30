import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { propertyId } = req.body;
    
    try {
        const session = await getSession(req, res)

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
                res.status(201).json({isBookmarked: true, session: true})
                return
            } else {
                res.status(201).json({isBookmarked: false, session: true})
                return
            } 
        }
        res.status(401).json({isBookmarked: false, session: false})
    } catch (err) {
        throw new Error("Did not manage to connect")
    }

}