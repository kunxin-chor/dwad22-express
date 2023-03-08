// An array to represent a collection

const { ObjectId } = require("mongodb");

// sightings collection
[
    {
        "_id":ObjectId("123"),
        "title":"Free food at LT2A",
        "food":["curry chicken","rice","kang kong"],
        "datetime": "2023-03-07",
        "comments":[
            {
                "_id":ObjectId("456"),
                "text":"The curry chicken tastes sour",
                "email":"lemon@asd.com"
            },
            {
                "_id":ObjectId("456"),
                "text":"The curry chicken tastes sour",
                "email":"lemon@asd.com"
            }

        ]
    },
    {
        "_id":ObjectId("124"),
        "title":"Leftover food after seminar",
        "food":["egg sandwich","chicken sandwich"],
        "datetime": "2023-03-07",
        "comments":[ObjectId(203), ObjectId(204)]
    }
]

// references
//COMMENTS COLLECTION
[
    {
        "_id": ObjectId("7788"),
        "sighting_id": ObjectId("124"),
        "text":"The sandwich is from Four Leaf and tastes very good",
        "email":"Tan Ah Kow"
    }

]