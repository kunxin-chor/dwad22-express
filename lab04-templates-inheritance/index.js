const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');

const app = express();

// set the view engine to hbs
app.set("view engine", "hbs");

// setup wax-on
waxOn.on(hbs.handlebars);  // we want to apply the wax-on package to our hbs
waxOn.setLayoutPath("./views/layouts"); // where to find the layouts

// routes 
app.get('/', function(req,res){
    res.render("index");
})

app.get('/about-us', function(req,res){
    res.render('about-us');
})

app.get('/contact-us', function(req,res){
    res.render('contact-us');
})

app.listen(3000, function(){
    console.log("Server has started")
})