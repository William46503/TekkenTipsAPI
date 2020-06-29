//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/TekkenTDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const tekken7Schema = ({
  CharName: String,
  Weakness: [String]
});

const Document = new mongoose.model("document", tekken7Schema);


app.post("/CharacterItem", function(req, res) {
  const reqCharName = req.body.character;
  const reqCharContent = req.body.characterContent;

  Document.findOne({
    CharName: reqCharName
  }, function(err, foundDoc) {
    if (!err) {
      if (!foundDoc) {
        const newDoc = new Document({
          CharName: reqCharName,
          Weakness: reqCharContent
        });
        newDoc.save();
      } else {
        foundDoc.Weakness.push(reqCharContent);
        foundDoc.save();
      }
    };
  });
});



app.get("/", function(req, res) {
  Document.find({}, function(err, foundList) {
    if (!err) {
      res.send(foundList);
    }
  });
});

app.listen(3000, function() {
  console.log("Server is up at port 3000");
});
