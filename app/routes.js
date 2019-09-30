// expose the routes to our app with module.exports
module.exports = function(app) {
    
    var jwt                     = require('jsonwebtoken'); // used to create, sign, and verify tokens
    var config                  = require('../config'); // get our config file
    var User                    = require('./models/user'); // get our mongoose model of users
    var port                    = process.env.PORT || 5000; // used to create, sign, and verify tokens
    var Event                   = require('./models/event'); // get our mongoose model of Events

    //cors request
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // api ---------------------------------------------------------------------
    
    // basic route
    app.get('/', function(req, res) {
        res.send('Hello! The API is at http://localhost:' + port);
    });

    //for register a user
    app.post('/register', function(req, res) {

        console.log(req.body);
        // create a sample user
        var user = new User({
            firstName   : req.body.firstName,
            lastName    : req.body.lastName,  
            emailId     : req.body.emailId,
            mobileNo    : req.body.mobileNo,
            password    : req.body.password 
        });

        // save the user
        user.save(function(err) {
            if (err){
                if(err.code == 11000){
                    res.json({success: false, message: "This Email Id has been already registered!"});
                }else{
                    res.json({success: false, message: err});
                }
            }
            else{
                res.json({ success: true, message: 'User saved successfully' });
            }
        });
    });

    // route to login a user (POST http://localhost:5000/login)
    app.post('/login', function(req, res) {
        // find the user
        User.findOne({
            emailId: req.body.emailId
        }, 
        function(err, user) {

            if (err) throw err;

            if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                expiresInMinutes: 1460 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                success: true,
                message: 'Enjoy your token!',
                userDetails: {
                    'firstName' : user.firstName,
                    'lastName'  : user.lastName,
                    'emailId'   : user.emailId,
                    'mobileNo'  : user.mobileNo,
                    'token'     : token
                }
                });
            }   

            }

        });
    });

    
    // route middleware to verify a token (This is created for to validate token via ajax call, this is copy of below route)
    app.use('/checkAuth',function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                res.json({ success: true, message: 'Enjoy your token' });
            }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });

        }
    });

    // route middleware to verify a token
    /*
    app.use(function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                //get user Record
                //console.log(decoded._doc); 
                //console.log(decoded._doc._id);   
                next();
            }
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });
        }
    });
    */

    app.post('/allEvents', function(req, res){
        console.log(req.body);
        Event.find({
            emailId: req.body.emailId
        },function(err, events){
            if(err){
                res.json({success: false, message: err});
            }else{
                res.json({success: true, data: events});
            }
        });
    });

    //create a new event
    app.post('/createEvent', function(req,res){
        console.log(req.body);
        // create a sample user
        var eventInd = new Event({
            eventType       : req.body.eventType,
            eventName       : req.body.eventName,
            eventDate       : req.body.eventDate,
            emailId         : req.body.emailId,
            mobileNo        : req.body.mobileNo, 
            isRepeatAnnually: req.body.isRepeatAnnually,
        });

        eventInd.save(function(err, event){
            if(err){
                res.json({success: false, message: err});
            }else{
                console.log('Event saved successfully');
                console.log(event);
                res.json({ success: true, message: 'Event saved successfully', eventData: event });
            }
        });
    });

    //Delete an event
    app.post('/deleteEvent', function(req,res){
        console.log(req.body);
        var query = { emailId: req.body.emailId, _id: req.body._id };

        Event.deleteOne(query, function (err, result) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                res.json({success: true, message: 'Event Delete Successfully', data: result});
            }

        });
    });

    //Edit an Event
    app.post('/editEvent', function(req, res){
        console.log(req.body);
        var query = { emailId: req.body.emailId, _id: req.body._id };
        var options = { new: true };
        var updateEventObj = {
            eventType       : req.body.eventType,
            eventName       : req.body.eventName,
            eventDate       : req.body.eventDate,
            emailId         : req.body.emailId,
            mobileNo        : req.body.mobileNo, 
            isRepeatAnnually: req.body.isRepeatAnnually,
        };
        Event.findOneAndUpdate(query, {$set: updateEventObj}, options, function (err, doc) {
            if (err) {
                res.json({success: false, message:err});
            } else {
                res.json({success: true, message: "Event update successfully", data: doc});
            }

        });
    });
    

};


//this is master-heroku
