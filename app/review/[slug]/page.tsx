
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]";
import ReviewInput from "../components/ReviewInput";
import styles from "@/styles/Review.module.css"

export default async function Page({params: {slug}}: {params: { slug: string }}) {

        const session = await getServerSession(authOptions)

        if (session?.user?.email) {
       
            const user = await prisma.user.findUnique({where: {email: session.user.email}})
           
            if (user) {
                const property = await prisma.property.findUnique({ 
                    where: { slug: slug },
                    include: {
                        reviews: {
                            where: {
                                userId: user.id
                            }, 
                            select: {
                                comment: true,
                                id: true
                            }
                        },
                        stars: {
                            where: {
                                userId: user.id,
                            }
                        }
                    }
                })

              
                if (property && property.stars && property.stars.length > 0 && property.reviews.length > 0) {
                    const starNum = property.stars[0].stars
                    const commentStr = property.reviews[0].comment
                    const starId = property.stars[0].id
                    const reviewId = property.reviews[0].id

                    return (
                        <div className={styles.container}>
                            <ReviewInput 
                                property={property} 
                                editingReview={true} 
                                comment={commentStr} 
                                stars={starNum}
                                reviewId={reviewId}
                                starId={starId}
                            />
                        </div>
                    )

                } else if (property) {
                    const starNum = 0;
                    const commentStr = ""
                    return (
                        <div className={styles.container}>
                            <ReviewInput 
                                property={property} 
                                editingReview={false} 
                                comment={commentStr} 
                                stars={starNum}
                                reviewId={null}
                                starId={""}
                            />
                        </div>
                    )
                } 
            } 
            
        } else {

        const property = await prisma.property.findUnique({ 
                where: { slug: slug },
            })

            if (property) {
                const starNum = 0;
                const commentStr = ""
                return (
                    <div className={styles.container}>
                        <ReviewInput 
                            property={property} 
                            editingReview={false} 
                            comment={commentStr} 
                            stars={starNum}
                            reviewId={null}
                            starId={""}
                        />
                    </div>
                )
            } 
            
        }

}

export const dynamic = 'force-dynamic'