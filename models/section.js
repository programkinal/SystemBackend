'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sectionSchema = Schema({
    section: String
})

module.exports = mongoose.model('Section', sectionSchema);