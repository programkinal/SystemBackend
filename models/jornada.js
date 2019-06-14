'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workingDaySchema = Schema({
    workingDay: String
})

module.exports = mongoose.model('workingDay', workingDaySchema);