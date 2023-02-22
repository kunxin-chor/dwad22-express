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

// create a helper to compare two values
// it will return true if both values are the same
// the first parameter is the name of the helper (how we are going to refer to it in the hbs file)
// the second parameter will be a function (will be called when the Express encounters the helper in the hbs file)
hbs.handlebars.registerHelper("ifEquals", function(arg1, arg2, options){
    if (arg1 == arg2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})

hbs.handlebars.registerHelper("ifGreater", function(arg1, arg2, options){
    if (arg1 > arg2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})

// ROUTES
app.get("/", function(req,res){
    res.render("index.hbs");
})

app.get("/holiday", function(req,res){
    res.render("holiday", {
        "isHoliday": false,
        "duration": 1
    })
})

app.get("/fruits", function(req,res){
    console.log("/fruits has been called");
    const fruitArray= ["apples", "bananas", "strawberries", "elderberries"];
    res.render("fruits.hbs",{
        "fruits": fruitArray
    })
})

// LISTEN
app.listen(3000, function(){
    console.log("Server has started");
})