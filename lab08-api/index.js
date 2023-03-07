const express = require("express");

// it will look at the .env
// and copy all the variables from .env
// into our OS
require('dotenv').config();

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
     const db = client.db("dwad20-free-food-sightings");


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
            const result = await db.collection("sightings")
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


}

main();

app.listen(3000, function(){
    console.log("Server has started");
})