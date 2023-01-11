import { Review, Star } from "@prisma/client"

export const placeholderReviews: Review[] = [
    {
        id:             1,
        createdAt:      new Date('January 1, 2023'),
        userId:         1,
        propertyId:     "1",
        comment:        "Pok pok keffiyeh keytar, cred tattooed chartreuse helvetica la croix taiyaki. Farm-to-table butcher coloring book, edison bulb pork belly mukbang sriracha. Brooklyn live-edge pork belly authentic intelligentsia migas, green juice synth yr edison bulb kitsch cliche. Cred brunch etsy fit iPhone chillwave heirloom af.",
        street:         "1234 Main St",
        citystate:      "Portland, OR",
        propertySlug:   "",
        flagged:        false,
        edited:         false,
        editedAt:       new Date('January 1, 2023'),
        safetyRating:   "",
        landlordRating: "",
        moveoutRating:  "",
        votes:          0,
        responseId:     1

    },
    {
        id:             2,
        createdAt:      new Date('January 10, 2023'),
        userId:         2,
        propertyId:     "2",
        comment:        "Wolf poke tumblr, big mood typewriter beard flannel actually food truck bespoke williamsburg ugh fam etsy. Butcher readymade vegan quinoa kitsch church-key banh mi ugh meh bodega boys.",
        street:         "4321 W 118th St",
        citystate:      "New York, NY",
        propertySlug:   "",
        flagged:        false,
        edited:         false,
        editedAt:        new Date('January 10, 2023'),
        safetyRating:   "",
        landlordRating: "",
        moveoutRating:  "",
        votes:          0,
        responseId:     1
    },
    {
        id:             3,
        createdAt:      new Date('February 1, 2023'),
        userId:         3,
        propertyId:     "3",
        comment:        "Tousled neutra chartreuse, schlitz literally beard pug tilde palo santo. +1 YOLO pok pok kale chips, four dollar toast truffaut actually swag activated charcoal gastropub you probably haven't heard of them gatekeep. Brooklyn brunch ascot cray vexillologist. ",
        street:         "4224 Mission St",
        citystate:      "San Francisco, CA",
        propertySlug:   "",
        flagged:        false,
        edited:         false,
        editedAt:       new Date('February 1, 2023'),
        safetyRating:   "",
        landlordRating: "",
        moveoutRating:  "",
        votes:          0,
        responseId:     1
    }
]

export const placeholderStars: Star[] = [
    {
        id: "1",
        createdAt: new Date('January 1, 2020'),
        userId: 1,
        propertyId: "1",
        reviewId: 1,
        stars: 4
    },
    {
        id: "2",
        createdAt: new Date('January 2, 2020'),
        userId: 2,
        propertyId: "2",
        reviewId: 2,
        stars: 3
    },
    {
        id: "3",
        createdAt: new Date('January 3, 2020'),
        userId: 3,
        propertyId: "3",
        reviewId: 3,
        stars: 5
    },

]