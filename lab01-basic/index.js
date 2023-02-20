// require function allows us to
// import packages that we have
// installed
// the express object from the `express`
// package will be available in the `express`
const express = require('express');

// STEP ONE: create a new express application
// create an express application
const app = express(); 

// STEP TWO
// Add a route
// A route consists of a PATH and a ROUTE FUNCTION
// first parameter is the PATH
// second parameter is the ROUTE FUNCTION
app.get("/", function(req,res){
    res.send("Hello world");
})

// we use GET for browsers accessing the route
// by address bar
app.get('/about-us', function(req,res){
    // first parameter: req - request
    // second parameter: res- response
  
    // send back as response the string "About Us"
    res.send("About Us");
});

app.get('/contact-us', function(req,res){
    res.send("<h1>Contact Us</h1>");
});

// a route parameter starts with a colon
// it works like a placeholder
// req.params the values inside the placeholders
// so the following are URLs that matches the path below
// /greet/paul (match)
// /greet/anderson (match)
// /greet/paul/chor (not a match)
app.get('/greet/:first_name', function(req,res){
    const firstName = req.params.first_name;
    res.send("Greetings, Mr. " + firstName);
})

// The following are a match:
// /greet/paul/chor
// /greet/Tom/Cruise
// /greet/Elijah/Woods

// /greet/Elijah (not a match)
app.get('/greet/:first_name/:last_name', function(req,res){
    console.log(req.params);
    res.send("Hi," + req.params.first_name + " " + req.params.last_name);
})

// STEP THREE:
// starts the server
// when the server has started, call the function
// in the second parameter
// the first parameter is the PORT number
app.listen(3000, function(){
    console.log("server started");
})