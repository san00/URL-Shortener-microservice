// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongoose = require('mongoose');

//i've added this
const MongoClient = require('mongodb').MongoClient;
const appUrl = process.env.MONGOLAB_URI;  
 

const shortUrl = require('./theShortenedUrl');
const bodyParser = require('body-parser');
const request = require('request');
var shortID = require('short-id-gen')
var cors = require('cors')
// app.use(cors())
app.use(bodyParser.json())
var data; 


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(" we are connected! hoorah");
});


// get the url to shorten - using mongoclient to connect to db allows me to push collections. I can see recently created urls in db.

MongoClient.connect(appUrl, function(err, db) {

 app.get('/new/:originalUrl(*)', function(req,res, next){
 
   var originalUrl = req.params.originalUrl; //get the info from entered url
   
   
   //save collection/schema to db with original url and unique id
     data = new shortUrl({
     originalUrl:originalUrl,
     shortenedUrl:shortID.generate(2)
});
    
   data.save((err) => { 
   
     if(err){
     console.log('ooops, sorry an error has occurred' + err);
        res.send('error' + err)
     }
   });
   // console.log("Connected successfully to server") ;
    return res.json(data);


   
 });
  });



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


