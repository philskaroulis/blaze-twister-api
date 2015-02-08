// BASE SETUP
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

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
