'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var familySchema = Schema({
    name: String,
    father: String,
    mother: String,
    inCharge: [],
    son: []
});

module.exports = mongoose.model('Family', familySchema);