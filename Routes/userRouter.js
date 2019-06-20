'use stric';

var express = require('express');
var userController = require('../Controllers/RolesController/createUserController');
var api = express.Router();

api.post('/Login',userController.login);
api.post('/Register', userController.saveUser);
api.get('/List-User',userController.reportUser);
api.put('/updateUser', userController.updateUser);
api.put('/deleteUser',userController.deleteUser);
module.exports = api