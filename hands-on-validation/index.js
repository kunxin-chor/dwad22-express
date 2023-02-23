const express = require("express");  // CommonJS
const hbs = require("hbs");

const app = express();

app.use(express.urlencoded({
    "extended": false
}))

app.set("view engine", "hbs");
app.get("/", function(req,res){
    res.render("form")
})

// the form is submitted to the same path
// that is rendered but via POST
app.post("/", function(req,res){
    console.log(req.body);

    // state variable (meaning it represents
    // a certain truth about the program)
    let errors = [];

    const name = req.body.name;
    if (name.length < 3) {
        errors.push("The name cannot be less than 3 characters");
    } else if (name.length > 200) {
        errors.push("The name cannot be more than 200 characters");
    }

    const email = req.body.email;

    if (!email.includes("@") || !email.includes(".")) {
        errors.push("The email address syntax is not valid");
    }

    // alternatively:
    // if (  !(email.includes("@") && email.includes("."))   )

    // if the vehicle is not selected
    if (!req.body.vehicle) {
        errors.push("Please select a vehicle");
    }
    let selectedItems= [];
    // checkboxes - empty, one, many
    // ensure we always have an array
    if (req.body.items) {
        if (Array.isArray(req.body.items)) {
            selectedItems = req.body.items;
        } else {
            selectedItems.push(req.body.items);
        }
    }

    if (selectedItems.length == 0) {
        errors.push("Please select at least one item description");
    } else if (selectedItems.length > 3) {
        errors.push("Please do not select more than 3 item descriptions");
    }


    if (errors.length == 0) {
        res.send("Pat yourself on the shoulder");
    } else {
        res.render("form", {
            "errors": errors
        })
    }


})

app.listen(3000, function(){
    console.log("Server has started")
})