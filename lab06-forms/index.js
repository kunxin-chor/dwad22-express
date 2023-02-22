const express = require("express");
const hbs = require("hbs");

const app = express();
app.set("view engine", "hbs");

//enable form processing
app.use(express.urlencoded({
    extended: false
}));

app.get("/add-food", function(req,res){
    res.render("index")
})

app.post("/add-food", function(req,res){
    console.log(req.body);

 

    // assign default values if none specified in the form (req.body)
    const foodName = req.body.foodName || "none given";
    const calories = req.body.calories || 0;
    // let meal = req.body.meal;
    // if (!meal) {
    //     meal = "not selected";
    // }

    // const meal = req.body.meal ? req.body.meal : "not selected";
    const meal = req.body.meal || "not selected";

    // normalize req.body.tags will ALWAYS be an array
    // if no tags selected -> empty array
    // if one tag selected -> array of one string
    // if two or more tags selected --> array of many strings

    // most straightforward
    // let tags = [];

    // if the user submitted tags is not faslely (i.e not undefined
    // or that the person at least one)
    // if (req.body.tags) {
    //     // if the user selects more than one tags
    //     // Array is a global variable that all JS files can use
    //     // isArray takes in one parameter and returns true if that
    //     // parameter is an array
    //     if (Array.isArray(req.body.tags)) {
    //         tags = req.body.tags;
    //     } else {
    //         // otherwise, the user has only selected one tag
    //         // and therefore req.body.tags is a single string
    //         // so we just add it to the empty tags array
    //         tags.push(req.body.tags)
    //     }
    // }
    // tags is guaranteed to be an array

    // let tags = req.body.tags ? req.body.tags : [];
    // // let tags = req.body.tags || []
    // tags = Array.isArray(tags) ? tags : [ tags ]

    let tags = req.body.tags ? Array.isArray(req.body.tags ) ? req.body.tags : [req.body.tags] : []


    res.render("submitted",{
        "foodName": foodName,
        "calories": calories,
        "tags": tags,
        "meal": meal
    });
})

app.listen(3001, function(){
    console.log("Server has began");
})