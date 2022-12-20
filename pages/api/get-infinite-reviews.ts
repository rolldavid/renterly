import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const rawCursor = query.cursor
  
  if (typeof rawCursor === "string") {
    const myCursor = parseInt(rawCursor)
    try {
        const reviews = await prisma.review.findMany({
          take: 8,
          skip: 0,
          cursor: {
            id: myCursor,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            stars: {
                select: {
                    stars: true
                }
            },
            user: {
                select: {
                    displayName: true,
                    citystate: true,
                    image: true,
                    id: true,
                }
            },
          },
        });

        const reviewList = reviews.map(review => {
            return {
                comment: review.comment,
                displayName: review.user.displayName,
                citystate: review.user.citystate,
                userId: review.user.id,
                userImage: review.user.image,
                stars: review.stars,
                date: review.createdAt
            }
        })
    
        res.status(201).json({
          reviews: reviewList,
          nextCursor: reviews[7].id,
        });
     
    } catch (err) {
        throw new Error("Did not manage to connect");
      }
  }

}
