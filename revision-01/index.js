// SETUP EXPRESS
const express = require("express"); // the `require` function is part of Common JS
const hbs = require('hbs');
const waxOn = require('wax-on');

const app = express();  // create the new Express application
app.set("view engine", "hbs");

// setup wax-on for template inheritance
waxOn.on(hbs.handlebars);
// tell wax-on where to find the layout files
waxOn.setLayoutPath("./views/layouts");

// ROUTES
app.get("/", function(req,res){
    res.render("index.hbs");
})

// LISTEN
app.listen(3000, function(){
    console.log("Server has started");
})