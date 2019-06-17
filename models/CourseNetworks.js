'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseNetworkSchema = Schema({
    red: {type: Schema.ObjectId, ref: 'Redes'},
    career: {type: Schema.ObjectId, ref: 'Career'},
    grader: {type: Schema.ObjectId, ref: 'Grader'},
    course: [{type: Schema.ObjectId, ref: 'Course'}],
});

module.exports = mongoose.model('CourseNetwork', CourseNetworkSchema);