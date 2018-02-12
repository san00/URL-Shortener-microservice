//create the schema or structure for collections sent to the database

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);

var Schema = mongoose.Schema;

var urlSchema = new Schema({

originalUrl:String,  
  shortenedUrl:String

},{timestamps:true});


module.exports = mongoose.model('shortUrl',urlSchema); //shortUrl is the collection/schema name.

// url schema set's up the initial object, which is used to define any future objects constructed.