
// BASE SETUP
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// read the environment
var port = process.env.PORT || 8080;
var dbConnect = process.env.MONGOLAB_URI || 'mongodb://localhost/';

// set bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set mongoose
mongoose.connect(dbConnect);
var Project = require('./models/project');
var Person = require('./models/person');

// DEFINE ROUTES
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/projects')

    // create a project (accessed at POST http://localhost:8080/api/projects)
    .post(function(req, res) {
        var project = new Project();
        project.name        = req.body.name;
        project.description = req.body.description;
        project.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Project created!' });
        });
    });

// on routes that end in /persons
// ----------------------------------------------------
router.route('/people')

    // create a person (accessed at POST http://localhost:8080/api/people)
    .post(function(req, res) {
        var person = new Person();
        person.firstName = req.body.firstName;
        person.lastName  = req.body.lastName;
        person.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Person created!' });
        });
    });

// REGISTER ROUTES
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
