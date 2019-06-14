'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inscriptionSchema = Schema({
    student: String,
    unitAcademy: [{}],
    grade: {type: Schema.ObjectId, ref: 'Person'},
    share: Number
});

module.exports = mongoose.model('Instructor', instructorSchema);