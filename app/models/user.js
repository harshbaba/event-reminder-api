// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    firstName       : { type: String, required: true},
    lastName        : { type: String, required: true},
    emailId         : { type: String, required: true, unique: true }, 
    mobileNo        : Number, 
    password        : { type: String, required: true}
}));