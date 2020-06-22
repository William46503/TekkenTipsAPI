//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/TekkenTDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const tekken7Schema = ({
  CharName : String,
  Weakness : [String]
});

const Document = new mongoose.model("document", tekken7Schema);

app.get("/", function(req, res){
  console.log("Website is up");
});

app.listen(3000, function(){
  console.log("Server is up at port 3000");
});
