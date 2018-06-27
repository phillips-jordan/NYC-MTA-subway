const express = require('express')
const gtfs = require('gtfs');
const mongoose = require('mongoose');
const config = require("./config.json");
const MongoClient = require("mongodb").MongoClient;
const url = config.mongoUrl;
const app = express();


//used mongoose to import the GTFS data

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


app.get('/getAllStops', (req, res)=>{
MongoClient.connect(
  url,
  (err, db) => {
    if (err) throw err;
    let dbo = db.db("nyc-mta-gtfs");
    dbo.collection("stops").find({}).toArray((err, ret)=>{
        if (err) throw err;
        console.log(ret)
        res.send(ret)
        db.close();
    })
  }
)}
)


app.listen(3000, ()=>{
      console.log('listening on 3000')
  })