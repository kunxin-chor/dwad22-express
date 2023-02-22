const express = require('express');
const hbs = require('hbs');

const app = express();
app.set("view engine", "hbs");

app.use(express.urlencoded({
    "extended": false
}))

app.get("/", function(req,res){
    res.render("fruits");
})

app.post("/", function(req,res){

    let priceChart = {
        "apple": 3,
        "durian": 15,
        "orange": 6,
        "banana": 4,
        
        
    }

    let fruits = [];

    // if it either an array or a string
    if (req.body.items) {

        // check if it's an array
        if (Array.isArray(req.body.items)) {
            fruits = req.body.items;
        } else {
            // if not an array, then must be string
            fruits.push(req.body.items)
        }

        
       
    }
    console.log("fruits =", fruits);
    // let total = 0;
    // for (let f of fruits) {
    //     if (f == "durian") {
    //         total += 15;
    //     }
    //     if (f == "apple") {
    //         total += 3;
    //     }
    //     if (f =="orange") {
    //         total += 6;
    //     }
    //     if (f== "banana") {
    //         total += 4;
    //     }
    // }

    let total = 0;
    for (let f of fruits) {
        const currentPrice = priceChart[f];
        total += currentPrice;
    }

    res.send("Total =" + total);
})

app.listen(3000, function(){
    console.log("Server has started")
})