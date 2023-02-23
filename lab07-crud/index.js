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
        "security": security,
        "cuisine":cuisine
    }

    // add to the database
    sightings.push(newFoodSighting);

    // when we send back a redirect, we are telling to the browser
    // to go to the a new URL
    res.redirect("/sightings");
})

// listen
// starts the server
app.listen(3000, function(){
    console.log("Server started")
})