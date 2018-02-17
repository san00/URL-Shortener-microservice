// init project
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const appUrl = process.env.MONGOLAB_URI;
const shortUrl = require('./theShortenedUrl');
const shortID = require('short-id-gen')

// get the url to shorten and save to db.

MongoClient.connect(appUrl, function(err, db) {

  app.get('/new/:originalUrl(*)', function(req, res, next) {

    const originalUrl = req.params.originalUrl; 

    //save collection to db 
    const data = new shortUrl({
      originalUrl: originalUrl,
      shortenedUrl: shortID.generate(4)
    });

    data.save((err) => {

      if (err) {
        console.log('ooops, sorry an error has occurred' + err);
        res.send('error' + err)
      }
    });
    return res.json(data);

  });


  // query db and return the short url

  app.get('/:shortUrlId', function(req, res, next) {

    var short = req.params.shortUrlId;
    console.log(short, "hello");

    shortUrl.findOne({
      'shortenedUrl': short
    }, (err, data) => {
      // console.log(shortUrlFind);

      if (err) {
        res.send('Error reading db' + err);
      } else {
        var regex = new RegExp("^(http|https)://", "i"); //regex check's whether url's in db have http/s   
        var strToCheck = data.originalUrl

        if (regex.test(strToCheck)) { //if it does, just redirect to the original url
          res.redirect(301, data.originalUrl);
        } else {
          return res.redirect(301, 'https//' + data.originalUrl); // if not, concatenate original url with https
        }
      }

    });
  });
});


http: //expressjs.com/en/starter/static-files.html
  app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});