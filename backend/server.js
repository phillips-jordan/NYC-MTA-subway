const express = require('express')
const gtfs = require('gtfs');
const mongoose = require('mongoose');
const config = require('./config.json')
const app = express();

mongoose.connect(config.mongoUrl);

gtfs
  .import(config)
  .then(() => {
    console.log("Import Successful");
    return mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
  });

  app.listen(3000, ()=>{
      console.log('listening on 3000')
  })