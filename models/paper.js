var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paperSchema = new Schema({
    grade: String,
    year: String,
    month: String,
    subject: String,
    rank: [],
    testPaper: String,
    testAnswer: String,
    testExplain: String
});

module.exports = mongoose.model('paper', paperSchema);