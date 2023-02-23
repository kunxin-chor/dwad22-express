// look into the node_modules folder
// to lcoate the express folder
const express = require("express");
const hbs = require('hbs');

// wax-on is enable template inheritance (aka template extension)
const wax = require('wax-on');
const app = express();

// setup the view engine
app.set("view engine", "hbs");

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

app.use(express.urlencoded({
    'extended': false
}))

// setup handlebars helpers
require('handlebars-helpers')(
    {
        "handlebars": hbs.handlebars
    }
)

// global array (meaning: it can be accessed by any
// route from anywhere)
const sightings = [
    {
        "id": 1,
        "title":"Free Food at LT2A",
        "cuisine": ["chinese", "western"],
        "security": true
    },
    {
        "id": 2,
        "title":"Sandwich spread outside seminar room 3A",
        "cuisine": ["western"],
        "security": false
    },
    {
        "id": 3,
        "title":"Buffet for visting professors",
        "cuisine":["chinese", "malay"],
        "security": true
    }
];

// routes
app.get("/", function(req,res){
    // send back to the browser
    // the content of hello.hbs
    // as the response
    res.render("hello")
})

app.get('/sightings', function(req,res){
    res.render('all-sightings',{
        'sightings': sightings
    })
})

// CREATE A NEW FOOD SIGHTING
app.get("/sightings/create", function(req,res){
    res.render("create-sighting.hbs")
})

app.post("/sightings/create", function(req,res){
    console.log(req.body);

    const title = req.body.title;
    const security = req.body.security || "yes";
    let cuisine = req.body.cuisine || [];
    cuisine = Array.isArray(cuisine) ? cuisine : [cuisine];

    const recordId = Math.floor(Math.random() * 1000000 + 1);

    const newFoodSighting = {
        "id": recordId,
        "title": title,
        "security": security == "yes",
        "cuisine":cuisine
    }

    // add to the database
    sightings.push(newFoodSighting);

    // when we send back a redirect, we are telling to the browser
    // to go to the a new URL
    res.redirect("/sightings");
})

app.get("/sightings/delete/:sighting_id", function(req,res){
    
    const recordId = req.params.sighting_id;

    // if there's no foodrecord with the matching sighting_id
    // default to an empty object
    let foodRecord = {};

    for (let record of sightings) {
        if (record.id == recordId) {
            foodRecord = record;
            break;
        }
    }

    console.log("deleting record", foodRecord);
    // display a confirmation
    res.render("confirm-delete", {
        "foodRecord": foodRecord
    });
})

app.post("/sightings/delete/:sighting_id", function(req,res){
    const recordId = req.params.sighting_id;
    // find the index of the food record
    // let indexToDelete = -1;
    // for (let i = 0; i < sightings.length; i++) {
    //     // if the current sighting record matches the one that we want to delete
    //     if (sightings[i].id == recordId) {
    //         indexToDelete = i;
    //         break;
    //     }
    // }

    let indexToDelete = sightings.findIndex(function(record){
        return record.id == recordId;
    })

    if (indexToDelete == -1) {
        res.send("Sorry the record id that you want to delete does not exist")
    } else {
        console.log("index to delete =", indexToDelete);
        
        sightings.splice(indexToDelete, 1);
        res.redirect("/sightings");
    }
})

app.get("/sightings/update/:sighting_id", function(req,res){
    const sightingToUpdateID = req.params.sighting_id;
    const recordToUpdate = sightings.find(function(record){
        return record.id == sightingToUpdateID;
    });

    res.render("update-sighting", {
        "record": recordToUpdate
    })
})

app.post("/sightings/update/:sighting_id", function(req,res){
    const sightingId = req.params.sighting_id;
    const indexToUpdate = sightings.findIndex( (record) => record.id == sightingId);

    // const cuisine = req.body.cuisine ? 
    //                     Array.isArray(req.body.cuisine) ? req.body.cuisine : [req.body.cuisine]
    //                     : []


    let cuisine = req.body.cuisine || [];
    cuisine = Array.isArray(cuisine) ? cuisine : [ cuisine];

    const updatedSighting = {
        "id": sightingId,
        "title": req.body.title,
        "cuisine": cuisine,
        "security": req.body.security == "yes"
    }

    sightings[indexToUpdate] = updatedSighting;

    res.redirect("/sightings");


})

// listen
// starts the server
app.listen(3000, function(){
    console.log("Server started")
})