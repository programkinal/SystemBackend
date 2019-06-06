'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = Schema({
    workingDay: String,
    career: {type: Schema.ObjectId, ref: 'Career'},
    section: String,
    course: {type: Schema.ObjectId, ref: 'Course'},
    instructor: {type: Schema.ObjectId, ref: 'Instructor'}

});

module.exports = mongoose.model('Assignment', assignmentSchema);