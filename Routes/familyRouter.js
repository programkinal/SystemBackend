'use strict';

var express = require('express');
var familyController = require('../Controllers/FamilyController/familyController');
var api = express.Router();

api.post('/searchPerson', familyController.searchPerson);
api.post('/saveFamily', familyController.saveFamily);
api.post('/searchFamily', familyController.searchFamily);
api.put('/updateFamily/:id', familyController.updateFamily);
api.get('/list-Person', familyController.listPerson);

module.exports = api;