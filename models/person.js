'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
    firstName: String, //firstName , firstLastName, birthname, religion, gender
    middleName: String,
    firstLastName: String, 
    secondLastName: String,
    marriedName: String,
    birthname: Date,
    religion: String,
    email: Array,
    gender: String,
    civilStatus: String,
    address: Array,
    /**------------------------------------------------------------------------------------------------------------------------------------------------ */
    phones: Array,
    // cellphone: Number,
    // house: Number,
    // otherNumber: Array
});

module.exports = mongoose.model('Person', personSchema);