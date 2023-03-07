const express = require("express");

// it will look at the .env
// and copy all the variables from .env
// into our OS
require('dotenv').config();

// process is always available
// it refers to current program that is running
console.log(process.env);

const app = express();


// for our Express to talk Mongo, likewise we need a client
// but this client is for Nodejs
const MongoClient = require("mongodb").MongoClient;

async function main() {
    // connect to MongoDB we need two piece of information
    // first parameter - the connection string
    // second parameter - a configuration object
    const client = await MongoClient.connect(process.env.MONGO_URI, {
        "useUnifiedTopology": true  // simplify our access to MongoDB
    });

    // get the sample_airbnb database and
    // store it in the db variable
     const db = client.db("sample_airbnb");

    app.get("/", async function(req,res){
        // select the first 20 documents
        // db.listingsAndReviews.find({}).limit(20)
        const listings = await db.collection("listingsAndReviews")
          .find({})
          .limit(20)
          .toArray(); // convert an array of objects

          console.log(listings);

          // send back to the client in the JSON format
          res.json(listings);
    })

}

main();

app.listen(3000, function(){
    console.log("Server has started");
})