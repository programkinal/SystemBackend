'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var graderSchema = Schema({
    grader: String
})

module.exports = mongoose.model('Grader', graderSchema);