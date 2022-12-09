import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(201).json({id: null})
        }
        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                },
                include: {
                    reviews: true
                }
            })
            if (user) {

                res.status(201).json({user: user})
            }
            
        } else {
            res.status(401).json({id: null})
        }
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }

}