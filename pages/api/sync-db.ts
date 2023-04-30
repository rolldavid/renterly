

import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "@/lib/prisma";

const cities = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA", "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Charlotte, NC", "Indianapolis, IN", "San Francisco, CA", "Seattle, WA", "Denver, CO", "Washington, DC", "Nashville, TN", "Oklahoma City, OK", "Boston, MA", "El Paso, TX", "Portland, OR", "Las Vegas, NV", "Louisville, KY", "Memphis, TN", "Detroit, MI", "Baltimore, MD", "Milwaukee, WI", "Albuquerque, NM", "Fresno, CA", "Tucson, AZ", "Sacramento, CA", "Kansas City, MO", "Mesa, AZ", "Atlanta, GA", "Omaha, NE", "Colorado Springs, CO", "Raleigh, NC", "Long Beach, CA", "Virginia Beach, VA", "Miami, FL", "Oakland, CA", "Minneapolis, MN", "Tulsa, OK", "Bakersfield, CA", "Wichita, KS", "Arlington, TX", "Aurora, CO", "Tampa, FL", "New Orleans, LA", "Cleveland, OH", "Honolulu, HI", "Anaheim, CA", "Henderson, NV", "Lexington, KY", "Irvine, CA", "Stockton, CA", "Orlando, FL", "Corpus Christi, TX", "Newark, NJ", "Riverside, CA", "St. Paul, MN", "Cincinnati, OH", "Santa Ana, CA", "Greensboro, NC", "Pittsburgh, PA", "Jersey City, NJ", "St. Louis, MO", "Lincoln, NE", "Duram, NC", "Anchorage, AK", "Plano, TX", "Buffalo, NY", "Toledo, OH", "Boise, ID", "Spokane, WA", "Huntsville, AL", "Des Moines, IA", "Grand Rapids, MI", "Juneau, AK", "Salem, OR", "Kansas City, KS", "Charleston, SC", "Joliet, IL", "Savannah, GA"]
const randomCity = cities[Math.floor(Math.random() * cities.length)]; 
const names = ["Cow", "Dog", "Cat", "Piggy", "Duck", "Giraffe", "Bear", "Rose", "Ghost", "Cactus"]
const adj = ["Silly", "Happy", "Mad", "Brave", "Bright", "Wise", "Cranky", "Kind", "Super", "Funny", "Wild", "Power"]
const randomName = names[Math.floor(Math.random() * names.length)]; 
const randomAdj = adj[Math.floor(Math.random() * adj.length)]; 
const randomNum = Math.floor(Math.random() * 10000) 
const displayName = randomAdj + randomName + randomNum

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { user } = req.body;

    if (user) {
        console.log("adding user...")

    try {
        const upsertUser = await prisma.user.upsert({
            where: {
              email: user.email,
            },
            update: {
            },
            create: {
              email: user.email,
              displayName,
              citystate: randomCity,
              image: `${randomName}`
            },
          })
       
        res.status(201).json({status: "ok"})
        return
    
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}
res.status(201).json({status: "ok"})
}