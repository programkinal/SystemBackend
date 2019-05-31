'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var redesSchema = Schema({
    name: String,
    career: String,
    dateInit: String,
    dateFinal: String
});

module.exports = mongoose.model('Redes', redesSchema);