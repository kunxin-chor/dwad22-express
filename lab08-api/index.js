const express = require("express");
const { ObjectId } = require("mongodb");

// it will look at the .env
// and copy all the variables from .env
// into our OS
require('dotenv').config();

// use consts instead of hard-coded strings
const COLLECTION = "sightings";
const DB = "dwad20-free-food-sightings";

const app = express();
app.use(express.json()); // enable JSON to be send via POST


// for our Express to talk Mongo, likewise we need a client
// but this client is for Nodejs
const MongoClient = require("mongodb").MongoClient;

async function main() {
    // connect to MongoDB we need two piece of information
    // first parameter - the connection string
    // second parameter - a configuration object

    // process is always available
// it refers to current program that is running
    const client = await MongoClient.connect(process.env.MONGO_URI, {
        "useUnifiedTopology": true  // simplify our access to MongoDB
    });

    // get the sample_airbnb database and
    // store it in the db variable
    // if we try to use a database that doesn't exist
    // mongo will assume we are creating a database
     const db = client.db(DB);


    // app.get("/", async function(req,res){
    //     // select the first 20 documents
    //     // db.listingsAndReviews.find({}).limit(20)
    //     const listings = await db.collection("listingsAndReviews")
    //       .find({})
    //       .limit(20)
    //       .toArray(); // convert an array of objects

    //       console.log(listings);

    //       // send back to the client in the JSON format
    //       res.json(listings);
    // })

    // adding a new food sighting ==> adding a new food sighting resource
    // so we use "POST"
    // the url should only contain the resource name, no verbs or action words
  
    app.post("/food-sighting", async function(req,res){

        if (!req.body.title) {
            // we have to tell the client that the title can't be
            res.status(400);
            res.json({
                "error":"You must provide a title"
            });
            return; // end the function
        }

        try {
            const result = await db.collection(COLLECTION)
                        .insertOne({
                            "title": req.body.title,
                            "food": req.body.food,
                            "datetime": new Date(req.body.datetime)
                        });
            // send back the result so the client
            // knows whether it is successful or not
            // and what the ID of the new document is
            res.json({
            "result": result
            });
        }  catch (err) {
            console.log(err);
            res.status(503);
            res.json({
                "error":"Database not available. Please try later"
            })
        }
       
    })

    
    // retrieve all existing food sighting
    app.get("/food-sighting", async function(req,res){

        // accessing query strings: 
        // console.log(req.query);
        const filter = {};

        // check if req.query.title is a truthy value
        if (req.query.title) {
            // add the `title` criteria to the filter object
            filter.title = {
                "$regex": req.query.title,
                "$options": "i"  // turns on case insensitive
            }
        }

        if (req.query.food) {
            filter.food = {
                "$in": [req.query.food]
            }
        }
  
        const sightings = await db.collection(COLLECTION).find(filter).toArray();
         
        res.json({
            "sightings": sightings
        })
    })

    // modify a document
    app.put("/food-sighting/:food_id", async function(req,res){
        
        // get the ID of the document that we want to change
        const foodId = req.params.food_id;
        
        // the data will in req.body
        const response = await db.collection(COLLECTION)
                            .updateOne({
                                "_id": new ObjectId(foodId)
                            },{
                                "$set": {
                                    "title": req.body.title,
                                    "food": req.body.food,
                                    "datetime": new Date(req.body.datetime)
                                }

                            });

        res.json({
            "status": response
        })


    })

    app.delete("/food-sighting/:food_id", async function(req,res){
        const result = await db.collection(COLLECTION).deleteOne({
            "_id": new ObjectId(req.params.food_id)
        })

        res.json({
            "status": "ok",
            "result": result
        })
    });

}

main();

app.listen(3000, function(){
    console.log("Server has started");
})