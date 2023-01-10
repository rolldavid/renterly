import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await unstable_getServerSession(req, res, authOptions)

        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: {email: session.user.email},
                include: {
                    bookmarks: {
                        select: {
                            property: true,
                            assignedAt: true,
                        }
                    }
                }
            })
            const bookmarks = user?.bookmarks.map(bookmark => {
                return (
                    {
                        street: bookmark.property.street,
                        city: bookmark.property.city,
                        state: bookmark.property.state,
                        slug: bookmark.property.slug,
                        assignedAt: bookmark.assignedAt,
                        propertyId: bookmark.property.id
                    }
                )
            })
            res.status(201).json({isLoggedIn: true, bookmarks })
            return;
        }
        res.status(401).json({isLoggedIn: false})
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}