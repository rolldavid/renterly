import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId, reviewId } = req.body;
    try {
        const session = await unstable_getServerSession(req, res, authOptions)

        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email
                }
            })
            if (user && user.id === userId) {
                await prisma.review.delete({
                    where: {
                        id: reviewId
                    }
                })
                res.status(201).json({status: "success"})
                return
            }
        }
        res.status(401).json({status: "unauthorized"})
    } catch (err) {
        throw new Error("Something went terribly wrong")
    }
}