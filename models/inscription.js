'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inscriptionSchema = Schema({
    person: {type: Schema.ObjectId, ref: 'Person'},
    unitAcademy: String,
    career: String,
    section: String,
    jornada: String,
    grade: String,
    share: Number
});

module.exports = mongoose.model('Inscription', inscriptionSchema);