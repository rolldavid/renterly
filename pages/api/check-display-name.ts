import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const badWords = ["2g1c", "5h1t", "5hit", "a55", "acrotomophilia", "anal", "anilingus", "anus", "arsehole", "assbanger", "assfucker", "assfukka", "ballsack", "bbw", "blowjob", "blowjobs", "boner", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "b00b", "bukkake", "bulldyke", "butthole", "buttplug", "breast", "c0ck", "c0cksucker", "carpet muncher", "carpetmuncher", "cawk", "chinc", "chink", "choad", "clit", "clitface", "clitoris", "cock", "cok", "coochie", "coon", "creampie", "cum", "cunilingus", "cunt", "d1ck", "dick", "deepthroat", "dike", "dildo", "doggie", "doggy", "dyke", "ejaculate", "erotic", "fag", "fart", "fecal", "fcuk", "felatio", "fellate", "fellatio", "squirt", "fingerbang", "fingerfuck", "fingering", "fuck", "flamer", "footjob", "fudge", "fuk", "fux", "gang", "gayass", "gaytard", "genitals", "goldenshower", "gooch", "grope", "goregasm", "gook", "grope", "handjob", "hardcore", "heshe", "hoar", "homo", "hooker", "horny", "horniest", "hotsex", "humping", "incest", "intercourse", "jackoff", "jailbait", "jiz", "juggs", "kawk", "kike", "kinky", "kiunt", "knobbing", "knobjob", "kock", "kondum", "kooch", "kootch", "kum", "kunt", "kyke", "labia", "lesbo", "lolita", "lust", "m45terbate", "ma5terb8", "ma5terbate", "masterb8", "masterbat", "menageatrois", "milf", "mothafuck", "motherfuck", "muff", "muther", "n1gga", "n1gger", "nazi", "negro", "neonazi", "nig", "nipple", "nude", "numbnuts", "nutsack", "nympho", "pussy", "orgas", "p0rn", "pedophile", "penis", "pedo", "paedophile", "pegging", "phuk", "phuq", "pisof", "piss", "polesmoker", "poop", "porn", "prick", "pube", "punanny", "pusies", "pusse", "pussi", "pussy", "pusy", "queaf", "queef", "rape", "raping", "rapist", "rectum", "retard", "rimjob", "rimming", "santorum", "scroat", "scrote", "scrotum", "semen", "sex", "shag", "shaved", "shemale", "shi+", "shit", "shiz", "slut", "skank", "slanteye", "sodomy", "snowballing", "spic", "spick", "splooge", "spunk", "strapon", "strappon", "suicide", "swastika", "t1tt1e5", "t1tties", "tard", "teets", "testical", "testicle", "threesome", "throating", "titfuck", "tits", "titt", "titwank", "topless", "tranny", "turd", "tushy", "twat", "tw4t", "twink", "upskirt", "v1gra", "v14gra", "vag", "viagra", "vibrator", "vjayjay", "voyeur", "wank", "vulva", "wank", "whoar", "whore"]   

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
    const { displayName, userId } = req.body;

    if (badWords.some(word => displayName.includes(word))) {
        res.status(201).json({nameAvailable: false})
        return
    }
    try {
        const user = await prisma.user.findFirst({
            where: {displayName: displayName}
        })
      
        if (!user) {
            res.status(201).json({nameAvailable: true})
        } else if (user.id === userId) {
            res.status(201).json({nameAvailable: true})
        } else {
            res.status(201).json({nameAvailable: false})
        }
    
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}}