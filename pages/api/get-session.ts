import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    try {
        const session = await unstable_getServerSession(req, res, authOptions)

        if (session?.user) {
            console.log("found user", session.user.email)
            res.status(201).json({email: session.user.email})
        } else {
            res.status(201).json({message: "Did not find user"})
        }
        
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }
}