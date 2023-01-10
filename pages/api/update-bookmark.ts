import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { propertyId, type } = req.body;

    const session = await unstable_getServerSession(req, res, authOptions)

    try {
        if (session?.user?.email) {
            if (type === "add") {
                const bookmark = await prisma.user.update({
                    where: {email: session.user.email},
                    data: {
                        bookmarks: {
                            create: {
                                property: {
                                    connect: {
                                        id: propertyId
                                    }
                                }
                            }
                        }
                    }
                })
            }
            if (type === "remove") {
                const bookmark = await prisma.user.update({
                    where: {email: session.user.email},
                    data: {
                        bookmarks: {
                            deleteMany: {
                                propertyId: propertyId
                            }
                        }
                    }
                })
            }
            res.status(201).json({status: "success"})
        } else {
            res.status(201).json({status: "unauthorized"})
        }

    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}