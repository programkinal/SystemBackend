'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instructorSchema = Schema({
    code: String,
    profesion: String,
    Person: {type: Schema.ObjectId, ref: 'Person'},
});

module.exports = mongoose.model('Instructor', instructorSchema);