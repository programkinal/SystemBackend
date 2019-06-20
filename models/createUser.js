'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var createUserSchema = Schema({
    nameUser: String,
    password: String,
    rol: String
})

module.exports = mongoose.model('User', createUserSchema);