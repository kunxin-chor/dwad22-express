// assign the `express` function to the `express` variable
const express = require('express'); 

// require in hbs 
const hbs = require('hbs');

// create a new express application
const app = express();

// enable static files
// static files are any file that is not generated
// via JavaScript coding.
// images is static file cos' not generated by coding
// videos is static file cos
// css is static file
// audio is static file
// browser-side JS file is also static 
app.use(express.static("static"));

// tell Express that we want to use handlebars (aka hbs)
// as our view engine (sometimes also known as a template engine)
app.set('view engine', 'hbs');

// routes
app.get("/", function(req,res){
    // send the content of index.hbs
    // back to the client
    res.render("index.hbs")
})

app.get("/lucky", function(req,res){
    const lucky = Math.floor(Math.random() * 99);
    // the .hbs extension is optional

    const date = new Date();

    // the first parameter is which hbs file
    // the second parmeter is an object
    // the key will be the name of the placeholders in the hbs file
    // the value will the value that will subsitue the placeholders
    res.render("lucky", {
        "luckyNumber":lucky,
        "todayDate": date
    });
})

// listen
app.listen(3000, function(){
    console.log("Server started")
})


