const express = require("express");
const { ObjectId } = require("mongodb");

const MongoUtil = require("./MongoUtil.js");

// it will look at the .env
// and copy all the variables from .env
// into our OS
require('dotenv').config();

// use consts instead of hard-coded strings
const COLLECTION = "sightings";
const DB = "dwad20-free-food-sightings";
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json()); // enable JSON to be send via POST

async function main() {
    // connect to MongoDB we need two piece of information
    // first parameter - the connection string
    // second parameter - a configuration object

    // process is always available
    // it refers to current program that is running
    const db = await MongoUtil.connect(MONGO_URI, DB);




    // adding a new food sighting ==> adding a new food sighting resource
    // so we use "POST"
    // the url should only contain the resource name, no verbs or action words

    app.post("/food-sighting", async function (req, res) {

        if (!req.body.title) {
            // we have to tell the client that the title can't be
            res.status(400);
            res.json({
                "error": "You must provide a title"
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
        } catch (err) {
            console.log(err);
            res.status(503);
            res.json({
                "error": "Database not available. Please try later"
            })
        }

    })


    // retrieve all existing food sighting
    app.get("/food-sighting", async function (req, res) {

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
    app.put("/food-sighting/:food_id", async function (req, res) {

        // get the ID of the document that we want to change
        const foodId = req.params.food_id;

        // the data will in req.body
        const response = await db.collection(COLLECTION)
            .updateOne({
                "_id": new ObjectId(foodId)
            }, {
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

    app.delete("/food-sighting/:food_id", async function (req, res) {
        const result = await db.collection(COLLECTION).deleteOne({
            "_id": new ObjectId(req.params.food_id)
        })

        res.json({
            "status": "ok",
            "result": result
        })
    });

    // begin CRUD for comments

    // create a new comment for an existing food_sighting
    // the name of the resource you are creating in the url
    app.post("/food-sighting/:food_id/comments", async function(req,res){
        // we are adding a new comment to the food sighting with id equals to req.params.food_id
        const result = await db.collection(COLLECTION).updateOne({
            "_id": new ObjectId(req.params.food_id)
        },{
            "$push": {
                "comments":{
                    "_id": new ObjectId(),
                    "text": req.body.text,
                    "email": req.body.email
                }
            }
        });
        res.json({
            "result": result
        })
    })

    // update an existing comment
    app.put("/food-sighting/:food_id/comments/:comment_id", async function(req,res){
        const results  = await db.collection(COLLECTION).updateOne({
            "_id": new ObjectId(req.params.food_id),
            "comments._id": new ObjectId(req.params.comment_id)
        },{
            "$set": {
                "comments.$.text": req.body.text,
                "comments.$.email": req.body.email
            }
        });
        res.json({
            "results": results
        });
    })

    app.delete("/food-sighting/:food_id/comments/:comment_id", async function(req,res){
        const results = await db.collection(COLLECTION)
                            .updateOne({
                                "_id": new ObjectId(req.params.food_id),
                            },{
                                "$pull": {
                                    "comments":{
                                        "_id": new ObjectId(req.params.comment_id)
                                    }
                                }
                            })
        res.json({
            "results": results
        })
    })



}

main();

app.listen(3000, function () {
    console.log("Server has started");
})