var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// mongoose Schema
var shelfSchema = {
  userName: {type: String, required: true},
  description: {type: String, required: true},
  imgUrl: String
};


 
module.exports = mongoose.model('shelfs', shelfSchema);
