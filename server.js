
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

// on routes that end in /projects
// ----------------------------------------------------
router.route('/projects')

    // create a project (POST /api/projects)
    .post(function(req, res) {
        var project = new Project();
        project.name        = req.body.name;
        project.description = req.body.description;
        project.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Project created!' });
        });
    })

    // get all the projects (GET /api/projects)
    .get(function(req, res) {
        Project.find(function(err, projects) {
            if (err)
                res.send(err);
            res.json(projects);
        });
    });

// on routes that end in /projects/:project_id
// ----------------------------------------------------
router.route('/projects/:project_id')

    // get the project with this id (GET /api//projects/:project_id)
    .get(function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err)
                res.send(err);
            res.json(project);
        });
    })

    // update the project with this id (PUT /api/projects/:project_id)
    .put(function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err)
                res.send(err);
            project.name        = req.body.name || project.name;
            project.description = req.body.description || project.description;
            project.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Project updated!' });
            });
        });
    })

    // delete the project with this id DELETE /api/projects/:project_id)
    .delete(function(req, res) {
        Project.remove({
            _id: req.params.project_id
        }, function(err, project) {
            if (err)
                res.send(err);
            res.json({ message: 'Project successfully deleted' });
        });
    });

// on routes that end in /persons
// ----------------------------------------------------
router.route('/people')

    // create a person (POST /api/people)
    .post(function(req, res) {
        var person = new Person();
        person.firstName = req.body.firstName;
        person.lastName  = req.body.lastName;
        person.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Person created!' });
        });
    })

    // get all the people (GET /api/people)
    .get(function(req, res) {
        Person.find(function(err, people) {
            if (err)
                res.send(err);
            res.json(people);
        });
    });

// on routes that end in /people/:person_id
// ----------------------------------------------------
router.route('/people/:person_id')

    // get the person with this id (GET /api//people/:person_id)
    .get(function(req, res) {
        Person.findById(req.params.person_id, function(err, person) {
            if (err)
                res.send(err);
            res.json(person);
        });
    })

    // update the person with this id (PUT /api/people/:person_id)
    .put(function(req, res) {
        Person.findById(req.params.person_id, function(err, person) {
            if (err)
                res.send(err);
            person.firstName = req.body.firstName || person.firstName;
            person.lastName  = req.body.lastName || person.lastName;
            person.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Person updated!' });
            });
        });
    })

    // delete the person with this id DELETE /api/projects/:person_id)
    .delete(function(req, res) {
        Person.remove({
            _id: req.params.person_id
        }, function(err, person) {
            if (err)
                res.send(err);
            res.json({ message: 'Person successfully deleted' });
        });
    });

// REGISTER ROUTES
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
