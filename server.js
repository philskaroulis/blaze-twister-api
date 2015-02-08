
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
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// REGISTER ROUTES
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
