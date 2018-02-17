//Schema -  Used to define any future objects sent to db.

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);

var Schema = mongoose.Schema;

var urlSchema = new Schema({

  originalUrl: String,
  shortenedUrl: String

}, {
  timestamps: true
});

module.exports = mongoose.model('shortUrl', urlSchema); //shortUrl is the collection/schema name.