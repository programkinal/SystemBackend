'use strict';

var express = require('express');
var inscriptionController = require('../Controllers/inscriptionController/inscriptionController');
var api = express.Router();

api.post('/saveInscription', inscriptionController.saveInscription);
api.get('/listPerson', inscriptionController.listPerson);
api.get('/listUnitAcademy', inscriptionController.listAcamedemicUnits);
api.get('/listCareer', inscriptionController.listCareer);
api.get('/listJornada', inscriptionController.listJornada);
api.get('/listGrade', inscriptionController.listGrade);

module.exports = api;