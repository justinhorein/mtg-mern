var express = require('express');
var router = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://127.0.0.1:27017";
const { appendFile } = require('fs');

router.post('/add', function(req, res, next) {

  console.log("add!!");
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

  res.status(200).send();
})

router.post('/update', function(req, res, next) {
  console.log("update!!!");
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
              db.close();
          })
      })
  }

  res.status(200).send();
})

/* GET home page. */
router.get('/deck', function(req, res, next) {
  console.log("deck!");
  MongoClient.connect("mongodb://127.0.0.1:27017", (err, db) => {
    if (err) {
      console.log("error!");
    }

    getCards(db, (deck) => {
      res.json(
        deck
      )
    })
  })
});

function getCards(db, callback) {
  let dbo = db.db("cards");
  var collection = dbo.collection("deck-node");
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  })
}

module.exports = router;
