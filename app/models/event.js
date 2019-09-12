// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Event', new Schema({ 
    eventType       : String,
    eventName       : String,
    eventDate       : String,
    emailId         : String,
    mobileNo        : Number, 
    isRepeatAnnually: Boolean,
}));

//Birthday, Anniversary, Other
// Rahul Semwal's Birthday
//2019-12-02
//harshbaba007@gmail.com
//rahul mobile No
//isRepeatAnnually: true
