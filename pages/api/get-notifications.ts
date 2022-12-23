import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    try {
        const session = await unstable_getServerSession(req, res, authOptions)

        
        if (session?.user?.email) {

            const user = await prisma.user.findFirst({
                where: {email: session.user.email},
                include: {
                    notificationsActive: {
                        select: {
                            createdAt: true,
                            notification: true,
                        
                            property: true
                        },
                        orderBy: {
                            createdAt: "desc"
                        } 
                    },
                    notificationsComplete: {
                        select: {
                            createdAt: true,
                            notification: true,
                         
                            property: true
                        },
                        orderBy: {
                            createdAt: "desc"
                        } 
                        
                    }
                }
            })

            const mappedActive = user?.notificationsActive.map(note => {
                return {
                    notification: note.notification.message,
                    notificationId: note.notification.id,
                    street: note.property?.street ? note.property.street : false,
                    slug: note.property?.slug ? note.property.slug : false,
                   
                    createdAt: note.notification.createdAt
                }
            })

            const mappedComplete = user?.notificationsComplete.map(note => {
                return {
                    notification: note.notification.message,
                    notificationId: note.notification.id,
                    street: note.property?.street ? note.property.street : false,
                    slug: note.property?.slug ? note.property.slug : false,
                    
                    createdAt: note.notification.createdAt,
                }
            })

            if (mappedActive && mappedActive.length > 0) {
                if (mappedComplete && mappedComplete.length > 0) {
                    res.status(201).json({activeNotifications: mappedActive, completeNotifications: mappedComplete})
                } else {
                    res.status(201).json({activeNotifications: mappedActive, completeNotifications: []})
                }
              
            } else { 
                if (mappedComplete && mappedComplete.length > 0) {
                    res.status(201).json({activeNotifications: [], completeNotifications: mappedComplete})
                } else { 
                    res.status(201).json({activeNotifications: [], completeNotifications: []})
                } 
            } 

        } else {
            res.status(201).json({message: "Did not find user"})
        }
        
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }
}