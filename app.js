'use stric'

var express = require('express');
'use stric'

var express = require('express');
var bodyParse = require('body-parser');

var app = express();

//CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

var people_router = require('./Routes/peopleRouter');
var educativeAdministracion_router = require('./Routes/educativeAdministracionRouter');
var family_router = require('./Routes/familyRouter');
var inscription_router = require('./Routes/inscriptionRouter');
var user_router = require('./Routes/userRouter')

app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

app.use('/People',people_router);
app.use('/EducativeAdministracion', educativeAdministracion_router);
app.use('/Family', family_router);
app.use('/Inscription', inscription_router);
app.use('/User', user_router);

module.exports = app;