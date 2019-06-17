'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var redesSchema = Schema({
    name: String,
    career: {type: Schema.ObjectId, ref: 'Career'},
    dateInit: String,
    dateFinal: String,
    careerAssigment: {type: Schema.ObjectId, ref: 'Career'},
    grader: {type: Schema.ObjectId, ref:'Grader'},
    course: {type: Schema.ObjectId, ref: 'Course'}
});

module.exports = mongoose.model('Redes', redesSchema);