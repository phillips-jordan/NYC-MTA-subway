const express = require('express')
const gtfs = require('gtfs');
const mongoose = require('mongoose');
const config = require("./config.json");
const MongoClient = require("mongodb").MongoClient;
const url = config.mongoUrl;
const app = express();


////used mongoose to import the GTFS data to db

// mongoose.connect(config.mongoUrl);

// gtfs
// .import(config)
// .then(() => {
//     console.log("Import Successful");
//     return mongoose.connection.close();
// })
// .catch(err => {
//     console.error(err);
// });




//Get all stops on Map load

app.get('/getAllStops', (req, res)=>{
MongoClient.connect(
  url,
  (err, db) => {
    if (err) throw err;
    let dbo = db.db("nyc-mta-gtfs");
    dbo.collection("stops").find({}).toArray((err, ret)=>{
        if (err) throw err;
        res.send(JSON.stringify(ret))
        db.close();
    })
  }
)}
)

//Get one stop by stop id

app.get("/getStop/:id", (req, res) => {
  let id = req.params.id  
  MongoClient.connect(
    url,
    (err, db) => {
      if (err) throw err;
      let dbo = db.db("nyc-mta-gtfs");
      let query = {stop_id: id}
      dbo
        .collection("stops")
        .findOne(query, (err, ret) => {
          if (err) throw err;
          res.send(JSON.stringify(ret));
          db.close();
        });
    }   
  );
});



app.listen(4000, ()=>{
      console.log('listening on 4000')
  })