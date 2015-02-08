
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonSchema   = new Schema({
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('Person', PersonSchema);
