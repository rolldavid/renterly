import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                }
            })
            if (user) {
                res.status(201).json({id: user.id})
            }
            res.status(401).json({message: "Did not find user"})
        }
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }

}