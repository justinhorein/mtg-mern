var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017";
const { appendFile } = require('fs');



function getCards(db, callback) {
  let dbo = db.db("cards");
  var collection = dbo.collection("deck-node");
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  })
}

/* GET home page. */
router.get('/deck', function(req, res, next) {

  MongoClient.connect("mongodb://localhost:27017", (err, db) => {
    if (err) {
      console.log("error!");
    }


    // console.log(db);
    getCards(db, (deck) => {
      // console.log(deck);
      // let cards = Object.entries(deck);
      res.json(
        deck
      )
    })
  })

  // res.json(
  //   "deck"
  // )
});

router.post('/add', function(req, res, next) {

  // console.log("wheeeereee");
  console.log(req.body);
  let card = req.body;

  
  MongoClient.connect("mongodb://localhost:27017", (err, db) => {
    if (err) {
      console.log("error!");
    }


    // Add Card to deck
    let dbo = db.db("cards");
    var collection = dbo.collection("deck-node");
    collection.insertOne(card, (err, res) => {
      if (err) throw err;
      console.log("Card added!");
      db.close();
    })
  })

  res.redirect("/deck");
})

router.post('/update', function(req, res, next) {
  console.log(req.body);
  let card = {
    img: req.body.img,
    number: req.body.number
  }

  if (card.number <= 0) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("cards");
        dbo.collection("deck-node").deleteOne({img:card.img}, (err, res) => {
            if (err) throw err;
            console.log("1 Card Deleted");
            db.close();
        })
    })
  } 
  else if (card.number <=4) {
      MongoClient.connect(url, (err, db) => {
          if (err) throw err;
          var dbo = db.db("cards");
          dbo.collection("deck-node").updateOne({img:card.img}, {$set: card}, { upsert: true}, (err, res) => {
              if (err) throw err;
              console.log("1 Card Updated");
              db.close();
          })
      })
  }

  res.redirect("/deck");
})

module.exports = router;
