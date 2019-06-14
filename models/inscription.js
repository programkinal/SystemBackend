'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inscriptionSchema = Schema({
    person: {type: Schema.ObjectId, ref: 'Person'},
    unitAcademy: [],
    jornada: {type: Schema.ObjectId, ref: 'Jornada'},
    grade: {type: Schema.ObjectId, ref: 'Grade'},
    share: Number
});

module.exports = mongoose.model('Inscription', inscriptionSchema);