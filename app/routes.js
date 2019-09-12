// expose the routes to our app with module.exports
module.exports = function(app) {
    
    var jwt                     = require('jsonwebtoken'); // used to create, sign, and verify tokens
    var config                  = require('../config'); // get our config file
    var User                    = require('./models/user'); // get our mongoose model of users
    var port                    = process.env.PORT || 5000; // used to create, sign, and verify tokens

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
            _id         : req.body.emailId,
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
                }
            }
            else{
                console.log('User saved successfully');
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

    app.get('/allEvents', function(req, res){
        let mockData = [
            {
             "id":"1",
             "eventType":"Birthday",
             "eventName":"Rahul's Birthday",
             "eventDate":"12-Jul-2019",
             "name":"harsh",
             "description":"lorem ipsum",
             "eventCreatedBy":"abc@com",
            },
            {
             "id":"2",
             "eventType":"Anniversary",
             "eventName":"Rahul's Anniversary",
             "eventDate":"12-Jul-2019",
             "name":"harsh",
             "description":"lorem ipsum",
             "eventCreatedBy":"abc@com",
            },
            {
             "id":"3",
             "eventType":"One Time Event",
             "eventName":"5km walk event",
             "eventDate":"12-Jul-2019",
             "name":"harsh",
             "description":"lorem ipsum",
             "eventCreatedBy":"abc@com",
            }
        ];

        res.send({"success": true, data: mockData});
            
    });
    

};


//this is master-heroku