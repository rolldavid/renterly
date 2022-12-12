import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const cities = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA", "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Charlotte, NC", "Indianapolis, IN", "San Francisco, CA", "Seattle, WA", "Denver, CO", "Washington, DC", "Nashville, TN", "Oklahoma City, OK", "Boston, MA", "El Paso, TX", "Portland, OR", "Las Vegas, NV", "Louisville, KY", "Memphis, TN", "Detroit, MI", "Baltimore, MD", "Milwaukee, WI", "Albuquerque, NM", "Fresno, CA", "Tucson, AZ", "Sacramento, CA", "Kansas City, MO", "Mesa, AZ", "Atlanta, GA", "Omaha, NE", "Colorado Springs, CO", "Raleigh, NC", "Long Beach, CA", "Virginia Beach, VA", "Miami, FL", "Oakland, CA", "Minneapolis, MN", "Tulsa, OK", "Bakersfield, CA", "Wichita, KS", "Arlington, TX", "Aurora, CO", "Tampa, FL", "New Orleans, LA", "Cleveland, OH", "Honolulu, HI", "Anaheim, CA", "Henderson, NV", "Lexington, KY", "Irvine, CA", "Stockton, CA", "Orlando, FL", "Corpus Christi, TX", "Newark, NJ", "Riverside, CA", "St. Paul, MN", "Cincinnati, OH", "Santa Ana, CA", "Greensboro, NC", "Pittsburgh, PA", "Jersey City, NJ", "St. Louis, MO", "Lincoln, NE", "Duram, NC", "Anchorage, AK", "Plano, TX", "Buffalo, NY", "Toledo, OH", "Boise, ID", "Spokane, WA", "Huntsville, AL", "Des Moines, IA", "Grand Rapids, MI", "Juneau, AK", "Salem, OR", "Kansas City, KS", "Charleston, SC", "Joliet, IL", "Savannah, GA"]
const randCity = cities[Math.floor(Math.random() * cities.length)]; 

const names = ["Salamander", "Turtle", "Lizard", "Gharial", "Condor", "Cormorant", "Hoatzin", "Kakapo", "Parrot", "Shoebill", "Pigeon", "Camel", "Tapir", "Tenrec", "Otter", "Markhor", "Platypus", "Antelope", "Monkey", "Crane", "Flamingo", "Hummingbird", "Duck", "Parakeet", "Quail", "Stork", "Woodpecker", "Bee", "Butterfly", "Grasshopper", "Ladybug", "Horse", "Pony", "Lamb", "Sheep", "Pig", "Bull", "Cow", "Chicken", "Dog", "Cat", "Puppy", "Hamster", "Jellyfish", "Perch", "Seahorse", "Shark", "Starfish", "Stingray", "Lobster", "Orca", "Dolphin", "Whale", "Alligator", "Bear", "Jaguar", "Giraffe", "Panda", "Lemur", "Rabbit", "Snail", "Walrus", "Wolf", "Wildebeest", "Falcon, Owl"]
const pickName = names[Math.floor(Math.random() * names.length)]; 
const pickNum = Math.floor(Math.random() * 10000) 
const randName = pickName + pickNum

const randProf = Math.floor(Math.random() * 15).toString()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {review, stars, userId, propertyId} = req.body;

        try {
            

            const prop = await prisma.property.update({
               where: {
                id: propertyId
               },
               data: {
                reviews: {
                    create: {
                        stars,
                        comment: review,
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                },
                stars: {
                    push: stars
                }

               }
            })

            const user = await prisma.user.findUnique({where: {id: userId}})

            if (user && !user.displayName) {
                await prisma.user.update({
                    where: { id: userId},
                    data: {
                        displayName: randName,
                        citystate: randCity,
                        image: `${randProf}`
                    }
                })
            }

                res.status(201).json({message: "success"})
            } catch (err) {
            res.status(401).json({message: "Did not manage to connect"})
        }
    }
}