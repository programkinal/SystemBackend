'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentInstructorCourse = Schema({
    course: {type: Schema.ObjectId, ref: 'courses'},
    instructor: [{type: Schema.ObjectId, ref: 'instructors'}]
});

module.exports = mongoose.model('assignmentInstructorCourse', assignmentInstructorCourse);