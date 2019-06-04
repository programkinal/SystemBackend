'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var redesSchema = Schema({
    name: String,
    career: {type: Schema.ObjectId, ref: 'Career'},
    dateInit: String,
    dateFinal: String
});

module.exports = mongoose.model('Redes', redesSchema);