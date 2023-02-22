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
    res.send("form recieved");
})

app.listen(3001, function(){
    console.log("Server has began");
})