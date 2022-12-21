import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    try {
        console.log("checking session")
        const session = await unstable_getServerSession(req, res, authOptions)

        
        if (session?.user?.email) {
            console.log("session found, checking user", session.user.email)

            const user = await prisma.user.findFirst({
                where: {email: session.user.email},
                include: {
                    notificationsActive: {
                        select: {
                            createdAt: true,
                            notification: true
                        }, 
                        
                    },
                    notificationsComplete: {
                        select: {
                            createdAt: true,
                            notification: true
                        },
                        
                    }
                }
                
            })

            const mappedNotifications = user?.notificationsActive.map(note => {
                return {
                    notification: note.notification.message,
                    createdAt: note.notification.createdAt
                }
            })

            console.log(mappedNotifications)

            if (mappedNotifications && mappedNotifications?.length > 0) {
                res.status(201).json({activeNotifications: mappedNotifications})

            } else {
                res.status(201).json({activeNotifications: false})
            }

        } else {
            res.status(201).json({message: "Did not find user"})
        }
        
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }
}