import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("starting update at api")
    try {
        const session = await unstable_getServerSession(req, res, authOptions)

        
        if (session?.user?.email) {

            const user = await prisma.user.findUnique({
                where: {email: session.user.email},
                include: {
                    notificationsActive: {
                        select: {
                            id: true,
                            notification: true
                        }, 
                        
                    },                        
                }
                
            })

            const mappedActive = user?.notificationsActive.map(note => {
                return {
                    id: note.id
                }
            })

            const mappedConnect = user?.notificationsActive.map(note => {
                return {
                    where: {
                        id: note.id
                    },
                    create: {
                        id: note.id,
                        notification: {
                            connect: {
                                id: note.notification.id
                            }
                        }
                    }
                }
            })


            if (mappedActive && mappedConnect) {
                const updateUser = await prisma.user.update({
                    where: {email: session.user.email},
                    data: {
                        notificationsActive: {
                            disconnect: mappedActive
                        },
                        notificationsComplete: {
                            connectOrCreate: mappedConnect
                        }
                    }
                })
            }
            
            res.status(201).json({message: "success"})


        } else {
            res.status(201).json({message: "Did not find user"})
        }
        
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }
}