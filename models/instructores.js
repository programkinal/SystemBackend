'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instructorSchema = Schema({
    code: String,
    profesion: String,
    Person: String,
});

module.exports = mongoose.model('Instructor', instructorSchema);